import YAML from 'js-yaml'
import { isNotEmpty } from '../../domain/common/Types'
import Entry from '../../domain/entry/Entry'
import * as EntryReference from '../../domain/entry/EntryReference'
import ValidationError from '../../domain/exception/ValidationError'
import Node from '../../domain/node/Node'
import * as NodeReference from '../../domain/node/NodeReference'
import { Hyperdrive } from '../../lib/beaker'

const BLOG_PATH = 'blog'
const PROFILE_FILE_NAME = 'profile'
const FOLLOW_FILE_PREFIX = 'follow'
const LIKE_FILE_PREFIX = 'like'
const ENTRY_FILE_PREFIX = 'entry'
const INFO_FILE_NAME = 'source-info'

const FOLLOW_FILE_QUERY = `/${BLOG_PATH}/${FOLLOW_FILE_PREFIX}-*.yml`
const LIKE_FILE_QUERY = `/${BLOG_PATH}/${LIKE_FILE_PREFIX}-*.yml`
const ENTRY_FILE_QUERY = `/${BLOG_PATH}/${ENTRY_FILE_PREFIX}-*.yml`
const INFO_FILE_PATH = `/${BLOG_PATH}/${INFO_FILE_NAME}.yml`

const MAX_ROTATING_FILE_SIZE = 2 * 1024 * 1024

const ENTRY_FILE_PATTERN = /\/?(?:.+\/)+entry-(-?\d+)\.yml/

const ERROR_MISSING_SOURCE_INFO =
  'Missing source info file. Plaza does not appear to have been installed in this Hyperdrive'

const PARSE_NODE_REFS = (nodes: string[]) => nodes.map(NodeReference.parse)
const PARSE_ENTRY_REFS = (entries: EntryReference.Raw[]) =>
  entries.map(EntryReference.parse)

interface ProfileRawData {
  username: string
  handle: string
  bio: string
  location?: string
  birth?: Date
  avatar?: string
  background?: string
}

interface EntryRawData {
  content?: string
  embed?: string
  reply?: EntryReference.Raw
  reblog?: EntryReference.Raw
}

interface NodeInfo {
  version: number
}

/**
 * Default time in milliseconds before an operation times out
 */
const DEFAULT_OP_TIMEOUT = 5000

export default class Client {
  private static readonly host = window.location.host
  private static readonly hyperdriveApi = window.beaker.hyperdrive

  static readonly LOCAL = NodeReference.parse(Client.host)

  async createNode(from: NodeReference.Type) {
    const origin = Client.hyperdriveApi.drive(from)

    const destination = await Client.hyperdriveApi.createDrive({
      title: 'Plaza',
      description: 'Decentralized microblogging social network',
      tags: 'social network microblogging',
      prompt: true,
    })

    await this.copySourceFiles(origin, destination)
    return NodeReference.parse(destination.url)
  }

  async updateNode(from: NodeReference.Type) {
    const origin = Client.hyperdriveApi.drive(from)
    const destination = Client.hyperdriveApi.drive(Client.LOCAL)
    const sourceInfo = await this.sourceInfo(destination)
    if (!sourceInfo)
      // Is this a Plaza Hyperdrive?
      throw Error(ERROR_MISSING_SOURCE_INFO)

    const originInfo = await origin.getInfo()
    if (sourceInfo.version && sourceInfo.version >= originInfo.version)
      // No update required
      return false
    await this.copySourceFiles(origin, destination)
    return true
  }

  nodeInfo(node: NodeReference.Type) {
    const drive = Client.hyperdriveApi.drive(node)
    return drive.getInfo()
  }

  createEntry(entry: Entry) {
    const drive = Client.hyperdriveApi.drive(Client.LOCAL)
    const rawData: EntryRawData = {
      content: entry.content,
      embed: entry.embed,
      reblog: entry.reblog,
      reply: entry.reply,
    }
    const path = this.entryFilePath(entry.date.getTime())
    return this.writeYaml(drive, path, rawData)
  }

  async resolveEntry(ref: EntryReference.Type) {
    const drive = Client.hyperdriveApi.drive(ref.node)
    const entryFile = await this.fetchFile(
      drive,
      this.entryFilePath(ref.date.getTime()),
    )
    const entry = this.parseYaml<EntryRawData>(entryFile)
    return this.parseEntry(ref.node, ref.date, entry)
  }

  async resolveNode(id: NodeReference.Type) {
    const drive = Client.hyperdriveApi.drive(id)
    const profileFile = await this.fetchFile(
      drive,
      `/${BLOG_PATH}/${PROFILE_FILE_NAME}.yml`,
    )
    const nodeData = this.parseYaml<ProfileRawData>(profileFile)
    if (nodeData === null) return null
    return new Node({
      // Order is important here. A malicious node could try to forge info.
      ...nodeData,
      id,
    })
  }

  entries(node: NodeReference.Type) {
    return this.fetchFiles(
      node,
      ENTRY_FILE_QUERY,
      (entryData: EntryRawData, path) =>
        new Entry({
          // Order is important here. A malicious node could try to forge info.
          ...entryData,
          node,
          date: this.parseDateFromPath(path),
        }),
    )
  }

  follows(node: NodeReference.Type) {
    return this.fetchFiles(node, FOLLOW_FILE_QUERY, PARSE_NODE_REFS)
  }

  likes(node: NodeReference.Type) {
    return this.fetchFiles(node, LIKE_FILE_QUERY, PARSE_ENTRY_REFS)
  }

  private async sourceInfo(drive: Hyperdrive.Hyperdrive) {
    const infoFilePath = await this.fetchFile(drive, INFO_FILE_PATH)
    return this.parseYaml<NodeInfo>(infoFilePath)
  }

  private async fetchFiles<Output, Content>(
    node: NodeReference.Type,
    fileQuery: string,
    parse: (element: Content, path: string) => Output,
  ) {
    const processFile = async ([path, promise]: readonly [
      string,
      Promise<string | null>,
    ]) => {
      const content = this.parseYaml<Content>(await promise)
      if (content === null) return null
      try {
        return parse(content, path)
      } catch (error) {
        console.warn('Unable to parse content', content, error)
        return null
      }
    }

    const drive = Client.hyperdriveApi.drive(node)
    const fetchedFiles = await this.queryFiles(drive, fileQuery)
    const processedOutput = await Promise.all(fetchedFiles.map(processFile))
    return processedOutput.filter(isNotEmpty).flat()
  }

  private parseDateFromPath(path: string) {
    const dateString = path.match(ENTRY_FILE_PATTERN)?.pop()!
    const dateInt = parseInt(dateString)
    if (isNaN(dateInt)) {
      throw new ValidationError(`Invalid date ${dateString}`)
    }
    const date = new Date(dateInt)
    return date
  }

  private entryFilePath(timestamp: number) {
    return `/${BLOG_PATH}/${ENTRY_FILE_PREFIX}-${timestamp}.yml`
  }

  private async queryFiles(drive: Hyperdrive.Hyperdrive, fileQuery: string) {
    const likeFiles = await drive.query({
      path: fileQuery,
      type: 'file',
      timeout: DEFAULT_OP_TIMEOUT,
    })

    return likeFiles
      .filter((file) => file.stat.size < MAX_ROTATING_FILE_SIZE)
      .map((file) => [file.path, this.fetchFile(drive, file.path)] as const)
  }

  private fetchFile(drive: Hyperdrive.Hyperdrive, path: string) {
    try {
      return drive.readFile(path, {
        encoding: 'utf8',
        timeout: DEFAULT_OP_TIMEOUT,
      })
    } catch (error) {
      console.warn('Unable to retrieve file', path, error)
      return Promise.resolve(null)
    }
  }

  private parseYaml<Output>(content: string | null): Output | null {
    if (!content) return null
    try {
      return YAML.load(content) as Output
    } catch (error) {
      console.warn('Unable to parse file', content, error)
      return null
    }
  }

  private parseEntry(
    node: NodeReference.Type,
    date: Date,
    entry: EntryRawData | null,
  ) {
    if (entry === null) return null
    return new Entry({
      // Order is important here. A malicious node could try to forge info.
      ...entry,
      node: node,
      date: date,
    })
  }

  private writeYaml<Content>(
    drive: Hyperdrive.Hyperdrive,
    path: string,
    content: Content,
  ) {
    const file = YAML.dump(content)
    return drive.writeFile(path, file, {
      metadata: {},
      encoding: 'utf8',
      timeout: DEFAULT_OP_TIMEOUT,
    })
  }

  private async copySourceFiles(
    source: Hyperdrive.Hyperdrive,
    destination: Hyperdrive.Hyperdrive,
  ) {
    const dirContent = await source.readdir('', {
      includeStats: true,
      timeout: DEFAULT_OP_TIMEOUT,
    })

    const filePromises = dirContent
      // Avoid blog folder, which contains all profile info.
      .filter(({ name, stat }) => stat.isFile() || name !== BLOG_PATH)
      .map(({ name }) =>
        Client.hyperdriveApi.copy(
          `${source.url}/${name}`,
          `${destination.url}/${name}`,
          { timeout: DEFAULT_OP_TIMEOUT },
        ),
      )

    return Promise.all(filePromises)
  }
}
