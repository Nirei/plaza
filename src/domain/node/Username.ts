import { parseBoundedLengthString } from '../common/Types'

export const MIN_LENGTH = 0
export const MAX_LENGTH = 50

export type Type = string & {
  readonly Username: unique symbol
}

export function parse(input: string) {
  return parseBoundedLengthString(input, MIN_LENGTH, MAX_LENGTH) as Type
}
