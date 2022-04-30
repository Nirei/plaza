import * as NodeReference from '../../domain/node/NodeReference'
import NodeRepository, { FindQuery } from '../../domain/node/NodeRepository'
import Client from '../beaker/Client'

export class BeakerNodeRepository implements NodeRepository {

  private readonly client = new Client()

  find(query: FindQuery): never {
    throw new Error('Method not implemented.')
  }
  fetch(id: NodeReference.Type) {
    return this.client.resolveNode(Client.LOCAL)
  }
  follows(
    id: NodeReference.Type,
    options: { page: number },
  ): never {
    throw new Error('Method not implemented.')
  }
}
