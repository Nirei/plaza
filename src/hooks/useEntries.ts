import {
  CreateEntryParameters,
  FindQuery,
} from '../domain/entry/EntryRepository'
import { BeakerEntryRepository } from '../infrastructure/entry/BeakerEntryRepository'

const REPOSITORY = new BeakerEntryRepository()

const find = (query?: FindQuery) => REPOSITORY.find(query)
const create = (entry: CreateEntryParameters) => REPOSITORY.create(entry)

export const useEntries = () => {
  return {
    find,
    create,
  }
}
