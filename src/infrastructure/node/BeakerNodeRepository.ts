import * as NodeReference from '../../domain/node/NodeReference'
import NodeRepository, { FindQuery } from '../../domain/node/NodeRepository'
import Client from '../beaker/Client'

export class BeakerNodeRepository implements NodeRepository {
  private readonly client = new Client()

  find(query: FindQuery): never {
    throw new Error('Method not implemented.')
  }
  fetch(id: NodeReference.Type) {
    return this.client.resolveNode(id)
  }
  follows(id: NodeReference.Type): never {
    throw new Error('Method not implemented.')
  }
  async isOwnNode(): Promise<boolean> {
    const info = await this.client.nodeInfo(Client.LOCAL)
    return info.writable
  }
  async isInstalled(): Promise<boolean> {
    const profile = await this.client.resolveNode(Client.LOCAL)
    return profile !== null
  }
  async local() {
    return (await this.fetch(Client.LOCAL))!
  }
}
