import ValidationError from "../exception/ValidationError"

export type Digest = string & { __brand: '/models/crypto/Digest' }

export function parse(input: string) {
  if (input.length === 0) throw new ValidationError('PublicKey cannot be blank')
  return input as Digest
}
