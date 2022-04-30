import YAML from 'js-yaml'
import { isNotEmpty } from '../../domain/common/Types'
import Entry from '../../domain/entry/Entry'
import * as EntryReference from '../../domain/entry/EntryReference'
import * as NodeReference from '../../domain/node/NodeReference'
import Node from '../../domain/node/Node'
import { Hyperdrive } from '../../lib/beaker'

const BASE_PATH = 'blog'
const PROFILE_FILE_NAME = 'profile'
const FOLLOW_FILE_PREFIX = 'follow'
const LIKE_FILE_PREFIX = 'like'
const ENTRY_FILE_PREFIX = 'entry'

const FOLLOW_FILE_QUERY = `/${BASE_PATH}/${FOLLOW_FILE_PREFIX}-*.yml`
const LIKE_FILE_QUERY = `/${BASE_PATH}/${LIKE_FILE_PREFIX}-*.yml`
const ENTRY_FILE_QUERY = `/${BASE_PATH}/${ENTRY_FILE_PREFIX}-*.yml`

const MAX_ROTATING_FILE_SIZE = 2 * 1024 * 1024

const ENTRY_FILE_PATTERN = /\/?(?:.+\/)+entry-(.+)/

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
      `/${BASE_PATH}/${ENTRY_FILE_PREFIX}-${ref.date.toISOString()}.yml`,
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
    return this.fetchFiles(node, FOLLOW_FILE_QUERY, NodeReference.parse)
  }

  async likes(node: NodeReference.Type) {
    return this.fetchFiles(node, LIKE_FILE_QUERY, EntryReference.parse)
  }

  private async fetchFiles<Output, Content>(
    node: NodeReference.Type,
    fileQuery: string,
    parse: (element: Content, path: string) => Output,
  ) {
    // Beware doubly nested functions
    const processFile = async ([path, promise]: readonly [
      string,
      Promise<string | null>,
    ]) => {
      // Here comes the double nesting...!
      const processElement = (element: Content) => {
        try {
          return parse(element, path)
        } catch (error) {
          console.warn('Unable to parse element', element, error)
          return null
        }
      }

      const content = this.parseYaml<Content[]>(await promise)
      if (!isNotEmpty(content)) return []
      return content.map(processElement).filter(isNotEmpty)
    }
    // Sorry... :(

    const drive = Client.hyperdriveApi.drive(node)
    const fetchedFiles = await this.queryFiles(drive, fileQuery)
    const processedOutput = await Promise.all(fetchedFiles.map(processFile))
    return processedOutput.flat()
  }

  private parseDateFromPath(path: string) {
    const dateString = path.match(ENTRY_FILE_PATTERN)?.pop()!
    return new Date(dateString)
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
