import YAML from 'js-yaml'
import Entry from '../../domain/entry/Entry'
import * as EntryReference from '../../domain/entry/EntryReference'
import * as NodeReference from '../../domain/node/NodeReference'
import Node from '../../domain/node/Node'
import { Hyperdrive } from '../../lib/beaker'
import { isNotEmpty } from '../../domain/common/Types'

const BASE_PATH = 'blog'
const PROFILE_FILE_NAME = 'profile'
const FOLLOW_FILE_PREFIX = 'follow'
const LIKE_FILE_PREFIX = 'like'
const ENTRY_FILE_PREFIX = 'entry'

const FOLLOW_FILE_QUERY = `/${BASE_PATH}/${FOLLOW_FILE_PREFIX}-*.yml`
const LIKE_FILE_QUERY = `/${BASE_PATH}/${LIKE_FILE_PREFIX}-*.yml`
const ENTRY_FILE_QUERY = `/${BASE_PATH}/${ENTRY_FILE_PREFIX}-*.yml`

const MAX_ROTATING_FILE_SIZE = 2 * 1024 * 1024

const ENTRY_FILE_PATTERN = /\/?(?:.+\/)+entry-(-?\d+)\.yml/

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

/**
 * Default time in milliseconds before an operation times out
 */
const DEFAULT_OP_TIMEOUT = 5000

export default class Client {
  private static readonly host = window.location.host
  private static readonly hyperdriveApi = window.beaker.hyperdrive

  static readonly LOCAL = NodeReference.parse(Client.host)

  async resolveEntry(ref: EntryReference.Type) {
    const drive = Client.hyperdriveApi.drive(ref.node)
    const entryFile = await this.fetchFile(
      drive,
      `/${BASE_PATH}/${ENTRY_FILE_PREFIX}-${ref.date.getTime()}.yml`,
    )
    const entry = this.parseYaml<EntryRawData>(entryFile)
    return this.parseEntry(ref.node, ref.date, entry)
  }

  async resolveNode(id: NodeReference.Type) {
    const drive = Client.hyperdriveApi.drive(id)
    const profileFile = await this.fetchFile(
      drive,
      `/${BASE_PATH}/${PROFILE_FILE_NAME}.yml`,
    )
    const nodeData = this.parseYaml<ProfileRawData>(profileFile)
    if (nodeData === null) return null
    return new Node({
      // Order is important here. A malicious node could try to forge info.
      ...nodeData,
      id,
    })
  }

  async entries(node: NodeReference.Type) {
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

  async follows(node: NodeReference.Type) {
    return this.fetchFiles(node, FOLLOW_FILE_QUERY, PARSE_NODE_REFS)
  }

  async likes(node: NodeReference.Type) {
    return this.fetchFiles(node, LIKE_FILE_QUERY, PARSE_ENTRY_REFS)
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
    return new Date(Date.parse(dateString))
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

  private async fetchFile(drive: Hyperdrive.Hyperdrive, path: string) {
    try {
      return drive.readFile(path, {
        encoding: 'utf8',
        timeout: DEFAULT_OP_TIMEOUT,
      })
    } catch (error) {
      console.warn('Unable to retrieve file', path, error)
      return null
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
}
