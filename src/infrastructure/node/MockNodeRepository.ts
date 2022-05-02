import Node from '../../domain/node/Node'
import * as NodeReference from '../../domain/node/NodeReference'
import NodeRepository, { FindQuery } from '../../domain/node/NodeRepository'

const MOCK_ENTRIES = [
  new Node({
    id: 'a88274af543e662d7db43453a4e63c3bfa410be46b69f4660f8c73d32435ddb7',
    username: 'Dr. Fiera',
    handle: 'enelcolacao',
    bio: 'Navegante del chéverespacio.',
    location: 'A Coruña, Galicia',
    birth: new Date('1991-05-01'),
    avatar: 'blog/avatar.jpg',
    background: 'blog/background.jpg',
  }),
]

export class MockNodeRepository implements NodeRepository {
  find(query: FindQuery) {
    return Promise.resolve(MOCK_ENTRIES)
  }
  fetch(id: NodeReference.Type) {
    const node = MOCK_ENTRIES.find((value) => value.id === id)
    if (!node) return Promise.resolve(null)
    return Promise.resolve(node)
  }
  follows(id: NodeReference.Type, options: { page: number }): never {
    throw new Error('Method not implemented.')
  }
  isOwnNode(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  local(): Promise<Node> {
    throw new Error('Method not implemented.')
  }
}
