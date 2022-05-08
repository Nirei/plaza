import SourceRepository, { ORIGIN } from '../../domain/source/SourceRepository'
import Client from '../beaker/Client'

export class BeakerSourceRepository implements SourceRepository {
  private readonly client = new Client()

  create() {
    return this.client.createNode(ORIGIN)
  }
  async update() {
    // Never try to update origin
    if (Client.LOCAL === ORIGIN) return false
    
    return this.client.updateNode(ORIGIN)
  }
}
