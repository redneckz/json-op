import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { leafs } from './entries';
import { fromEntries } from './fromEntries';

export type JSONMapper = (entry: JSONEntry) => JSONEntry;

export const map =
  (mapper: JSONMapper, initial: JSONNode = {}) =>
  (node: JSONNode): JSONNode =>
    fromEntries(
      leafs(node).map(_ => mapper(_)),
      initial
    );
