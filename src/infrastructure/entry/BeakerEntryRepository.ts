import Entry from "../../domain/entry/Entry";
import EntryRepository, { FindQuery } from "../../domain/entry/EntryRepository";
import Client from "../beaker/Client";

export class BeakerEntryRepository implements EntryRepository {

  private readonly client = new Client()

  find(query: FindQuery) {
    // FIXME: Implement query
    return this.client.entries(Client.LOCAL)
  }
  create(entry: Entry): Promise<void> {
    throw new Error('Method not implemented.')
  }
}