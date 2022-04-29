import { HEX_STRING_PATTERN, parseBoundedLengthString, parseRegexValidatedString } from '../common/Types'

export const MIN_LENGTH = 1
export const MAX_LENGTH = 4096

export type Type = string & {
  readonly PublicKey: unique symbol
}

export function parse(input: string) {
  return parseRegexValidatedString(
    parseBoundedLengthString(input, MIN_LENGTH, MAX_LENGTH),
    HEX_STRING_PATTERN,
  ) as Type
}
