import { Digest } from "../crypto/Digest"
import * as NodeReference from "../node/NodeReference"

export default interface EntryReference {
  readonly node: NodeReference.Type
  readonly date: Date
  readonly hash: Digest
}