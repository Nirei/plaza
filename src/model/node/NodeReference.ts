import * as PublicKey from "../crypto/PublicKey";

export type Type = PublicKey.Type & { __brand: "/model/node/NodeReference" }

export function parse(input: string) {
  return PublicKey.parse(input) as Type
}