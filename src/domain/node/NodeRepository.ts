import * as NodeReference from '../node/NodeReference'
import Node from './Node'

export interface FindQuery {
  ids?: NodeReference.Type[]
}

/**
 * Repository for node information
 */
export default interface NodeRepository {
  /**
   * Find nodes from your known nodes.
   * @param query the data to use for the search
   */
  find(query: FindQuery): Promise<Node[]>
  /**
   * Find a known node by id
   * @param id the id of the target node
   */
  fetch(id: NodeReference.Type): Promise<Node | null>
  /**
   * Get the list of node IDs that a certain known node follows
   * @param id the id of the target node
   */
  follows(id: NodeReference.Type): Promise<NodeReference.Type[]>
  /**
   * @returns true if the local node is writable to the user, false otherwise.
   */
  isOwnNode(): Promise<boolean>
  /**
   * @returns true if the local node has been initialized with a profile
   */
  isInstalled(): Promise<boolean>
  /**
   * Returns the local node.
   */
  local(): Promise<Node>
}
