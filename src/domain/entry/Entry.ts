import ValidationError from '../exception/ValidationError'
import * as NodeReference from '../node/NodeReference'
import * as EntryContent from './EntryContent'
import * as EntryEmbedment from './EntryEmbedment'
import * as EntryReference from './EntryReference'

const ENTRY_FILE_PREFIX = 'entry-'

interface EntryData {
  node: string
  date: Date
  content?: string
  embed?: string
  reply?: EntryReference.Raw
  reblog?: EntryReference.Raw
}

export default class Entry {
  /** Entry's author node */
  readonly node: NodeReference.Type
  /** Entry's publishing date */
  readonly date: Date
  /** Entry's textual content */
  readonly content?: EntryContent.Type
  /** The embedded content of the entry. This will be an URI linking to a media or website. Not mandatory. */
  readonly embed?: EntryEmbedment.Type
  /** Pointer to the message this entry is replying to. Not mandatory. */
  readonly reply?: EntryReference.Type
  /**
   * Pointer to the entry this entry is reblogging.
   * If reblog is specified but no content is specified, this will be a normal reblog.
   * If both reblog and textual content are specified, this will be a quoted reblog.
   */
  readonly reblog?: EntryReference.Type

  constructor({ node, date, content, embed, reply, reblog }: EntryData) {
    this.node = NodeReference.parse(node)
    this.date = date
    this.content = content ? EntryContent.parse(content) : undefined
    this.embed = embed ? EntryEmbedment.parse(embed) : undefined
    this.reply = reply ? EntryReference.parse(reply) : undefined
    this.reblog = reblog ? EntryReference.parse(reblog) : undefined

    this.validate()
  }

  public get filename() {
    return `${ENTRY_FILE_PREFIX}${this.date.toISOString()}.yml`
  }

  public get uri() {
    return `${this.node}/blog/${this.filename}`
  }

  private validate() {
    if (!this.content && !this.reblog) {
      throw new ValidationError(
        'At least one of content or reblog attribute required',
      )
    }
  }
}
