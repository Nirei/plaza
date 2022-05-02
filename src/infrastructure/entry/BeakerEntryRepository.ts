import Entry from '../../domain/entry/Entry'
import EntryRepository, { FindQuery } from '../../domain/entry/EntryRepository'
import Client from '../beaker/Client'

export class BeakerEntryRepository implements EntryRepository {
  private readonly client = new Client()

  async find(_query?: FindQuery) {
    const nodes = await this.client.follows(Client.LOCAL)
    nodes.push(Client.LOCAL)
    const entries = await Promise.all(
      nodes.map((node) => this.client.entries(node)),
    )
    const pastEntries = entries
      .flat()
      .filter((entry) => entry.date < new Date())
    return pastEntries.sort(
      (entry1, entry2) => entry1.date.getTime() - entry2.date.getTime(),
    )
  }
  
  create(entry: Entry): Promise<void> {
    return this.client.createEntry(entry)
  }
}
