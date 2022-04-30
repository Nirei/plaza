import ValidationError from '../exception/ValidationError'

export function isNotEmpty<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined
}

export function parsePositiveNumber(value: number) {
  if (value >= 0) {
    return value
  }

  throw new ValidationError('positive number expected, but was ' + value)
}

/**
 * Ensure that a string is between two given lengths. Both are inclusive.
 * @param value string to be checked
 * @param min minimum acceptable size
 * @param max maximum acceptable size
 * @returns the same string
 * @throws ValidationError if the string doesn't fit the retrictions
 */
export function parseBoundedLengthString(
  value: string,
  min: number,
  max: number,
) {
  const length = value.length
  if (length < min)
    throw new ValidationError(
      `cannot have less than ${min} characters, had ${length}`,
    )
  if (length > max)
    throw new ValidationError(
      `cannot have more than ${max} characters, had ${length}`,
    )
  return value
}

export const HEX_STRING_PATTERN = /[A-Fa-f0-9]/

export function parseRegexValidatedString(value: string, regex: RegExp) {
  if (!value.match(regex)) {
    throw new ValidationError(`expected to match ${regex}, was ${value}`)
  }
  return value
}
