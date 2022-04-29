import ValidationError from '../exception/ValidationError'
import * as NodeReference from '../node/NodeReference'
import * as EntryContent from './EntryContent'
import * as EntryEmbedment from './EntryEmbedment'
import EntryReference from './EntryReference'

const ENTRY_FILE_PREFIX = 'entry-'

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
  readonly reply?: EntryReference
  /**
   * Pointer to the entry this entry is reblogging.
   * If reblog is specified but no content is specified, this will be a normal reblog.
   * If both reblog and textual content are specified, this will be a quoted reblog.
   */
  readonly reblog?: EntryReference

  constructor(
    node: string,
    date: Date,
    content?: string,
    embed?: string,
    reply?: EntryReference,
    reblog?: EntryReference,
  ) {
    this.node = NodeReference.parse(node)
    this.date = date
    this.content = content ? EntryContent.parse(content) : undefined
    this.embed = embed ? EntryEmbedment.parse(embed) : undefined
    this.reply = reply
    this.reblog = reblog

    this.validate()
  }

  public get id() {
    return `${this.date.toISOString()}`
  }

  public get filename() {
    return `${ENTRY_FILE_PREFIX}${this.id}.yml`
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
