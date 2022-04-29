import * as NodeReference from '../node/NodeReference'
import Node from './Node'

export interface FindQuery {
  ids?: NodeReference.Type[]
}

export default interface NodeRepository {
  find(query: FindQuery): Promise<Node[]>
  fetch(id: NodeReference.Type): Promise<Node>
}
