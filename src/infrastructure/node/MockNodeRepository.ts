import { NotFoundError } from '../../domain/exception/NotFoundError'
import Node from '../../domain/node/Node'
import NodeRepository, { FindQuery } from '../../domain/node/NodeRepository'
import * as NodeReference from '../../domain/node/NodeReference'

const MOCK_ENTRIES = [
  new Node(
    'a88274af543e662d7db43453a4e63c3bfa410be46b69f4660f8c73d32435ddb7',
    'Dr. Fiera',
    '@enelcolacao',
    'Navegante del chéverespacio.',
    'A Coruña, Galicia',
    new Date('1991-05-01'),
    'blog/avatar.jpg',
    'blog/background.jpg',
  ),
]

export class MockNodeRepository implements NodeRepository {
  find(query: FindQuery) {
    return Promise.resolve(MOCK_ENTRIES)
  }
  fetch(id: NodeReference.Type): Promise<Node> {
    const node = MOCK_ENTRIES.find((value) => value.id === id)
    if (!node) throw new NotFoundError(`no node with ID ${id}`)
    return Promise.resolve(node)
  }
}
