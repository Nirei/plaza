import * as PublicKey from '../crypto/PublicKey'

export type Type = PublicKey.Type & { readonly NodeReference: unique symbol }

export function parse(input: string) {
  return PublicKey.parse(input) as Type
}
