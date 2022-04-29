import Entry from "../../domain/entry/Entry";
import EntryRepository from "../../domain/entry/EntryRepository";

const MOCK_ENTRIES = [
  new Entry(
    'a88274af543e662d7db43453a4e63c3bfa410be46b69f4660f8c73d32435ddb7',
    new Date('2022-04-29T01:25:00Z'),
    "I'm Mr. Meeseeks, look at me!",
  ),
  new Entry(
    'a88274af543e662d7db43453a4e63c3bfa410be46b69f4660f8c73d32435ddb7',
    new Date('2022-04-27T23:33:00Z'),
    'This will be the first entry in Plaza ever. 🐦',
  ),
]

export class MockEntryRepository implements EntryRepository {
  find() {
    return Promise.resolve(MOCK_ENTRIES)
  }
}