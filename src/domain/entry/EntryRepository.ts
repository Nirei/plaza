import * as NodeReference from '../node/NodeReference'
import DateRange from '../common/DateRange'
import Entry from './Entry'
import * as EntryContent from '../../domain/entry/EntryContent'
import * as EntryEmbedment from '../../domain/entry/EntryEmbedment'
import * as EntryReference from '../../domain/entry/EntryReference'

export interface FindQuery {
  users?: NodeReference.Type[]
  dateRange?: DateRange
}

export type CreateEntryParameters = (
  | {
      content?: EntryContent.Type
      reblog: EntryReference.Type
    }
  | {
      content: EntryContent.Type
      reblog?: EntryReference.Type
    }
) & {
  node?: NodeReference.Type
  date?: Date
  embed?: EntryEmbedment.Type
  reply?: EntryReference.Type
}

export default interface EntryRepository {
  find(query: FindQuery): Promise<Entry[]>
  create(parameters: CreateEntryParameters): Promise<void>
}
