import * as NodeReference from '../node/NodeReference'
import DateRange from '../common/DateRange'
import Entry from './Entry'

export interface FindQuery {
  users?: NodeReference.Type[]
  dateRange?: DateRange
}

export default interface EntryRepository {
  find(query: FindQuery): Promise<Entry[]>
  create(entry: Entry): Promise<void>
}
