import { parseBoundedLengthString } from '../common/Types'

export const MIN_LENGTH = 0
export const MAX_LENGTH = 15

export type Type = string & {
  readonly Handle: unique symbol
}

export function parse(input: string) {
  return parseBoundedLengthString(input, MIN_LENGTH, MAX_LENGTH) as Type
}

export * as Handle from './Handle'