import { parseBoundedLengthString } from '../common/Types'

export const MIN_LENGTH = 0
export const MAX_LENGTH = 160

export type Type = string & {
  readonly Bio: unique symbol
}

export function parse(input: string) {
  return parseBoundedLengthString(input, MIN_LENGTH, MAX_LENGTH) as Type
}

export * as Bio from './Bio'