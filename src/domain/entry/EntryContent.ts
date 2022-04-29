import { parseBoundedLengthString } from '../common/Types'

export const MIN_LENGTH = 1
export const MAX_LENGTH = 280

export type Type = string & {
  readonly EntryContents: unique symbol
}

export function parse(input: string) {
  return parseBoundedLengthString(input, MIN_LENGTH, MAX_LENGTH) as Type
}
