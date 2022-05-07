import SourceRepository, { ORIGIN } from "../../domain/source/SourceRepository";
import Client from "../beaker/Client";

export default class BeakerSourceRepository implements SourceRepository {
  private readonly client = new Client()

  create() {
    return this.client.createNode(ORIGIN)
  }
  update(): never {
    // TODO: Me!
    throw new Error('Method not implemented.')
  }
}