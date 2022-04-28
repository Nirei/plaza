import ValidationError from "../exception/ValidationError"

export type Type = string & { __brand: '/model/common/Uri' }

export function parse(input: string) {
  if (input.length === 0) throw new ValidationError('Uri cannot be blank')
  return input as Type
}
