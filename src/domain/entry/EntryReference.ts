import * as Digest from '../crypto/Digest'
import * as NodeReference from '../node/NodeReference'

export interface Raw {
  node: string
  date: Date
  hash: string
}

export interface Type {
  readonly node: NodeReference.Type
  readonly date: Date
  readonly hash: Digest.Type
}

export function parse({ node, date, hash }: Raw) {
  return {
    node: NodeReference.parse(node),
    date,
    hash: Digest.parse(hash),
  } as Type
}

export * as EntryReference from './EntryReference'