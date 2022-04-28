import ValidationError from '../exception/ValidationError'

export type Type = string & { __brand: '/models/crypto/PublicKey' }

export function parse(input: string) {
  if (input.length === 0) throw new ValidationError('PublicKey cannot be blank')
  return input as Type
}
