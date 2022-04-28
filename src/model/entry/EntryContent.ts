import ValidationError from "../exception/ValidationError"

export type Type = string & { __brand: "/model/entry/EntryContent" }

export function parse(input: string) {
  if(input.length === 0) throw new ValidationError("EntryContent cannot be blank")
  return input as Type
}