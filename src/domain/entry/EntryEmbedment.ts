import * as Uri from "../common/Uri";

export type Type = Uri.Type & { readonly EntryEmbedment: unique symbol }

export function parse(input: string) {
  return Uri.parse(input) as Type
}

export * as EntryEmbedment from './EntryEmbedment'