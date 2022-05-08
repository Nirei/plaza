import { NodeReference } from '../domain/node/NodeReference'
import { FindQuery } from '../domain/node/NodeRepository'
import { BeakerNodeRepository } from '../infrastructure/node/BeakerNodeRepository'

const REPOSITORY = new BeakerNodeRepository()
const find = (query: FindQuery) => REPOSITORY.find(query)
const fetch = (id: NodeReference.Type) => REPOSITORY.fetch(id)
const follows = (id: NodeReference.Type) => REPOSITORY.follows(id)
const isOwnNode = () => REPOSITORY.isOwnNode()
const isInstalled = () => REPOSITORY.isInstalled()
const local = () => REPOSITORY.local()

export const useNodes = () => {
  return {
    find,
    fetch,
    follows,
    isOwnNode,
    isInstalled,
    local,
  }
}
