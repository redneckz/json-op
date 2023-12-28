import { type JSONNode } from './JSONNode';
import { entries, type JSONEntry } from './entries';
import { fromEntries } from './fromEntries';

export type JSONMapper = (entry: JSONEntry) => JSONEntry;

export const map =
  (mapper: JSONMapper) =>
  (node: JSONNode): JSONNode =>
    fromEntries(
      entries(node).map(_ => mapper(_)),
      {}
    );
