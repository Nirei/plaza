import * as Uri from "../common/Uri";

export type Type = Uri.Type

export function parse(input: string) {
  return Uri.parse(input) as Type
}