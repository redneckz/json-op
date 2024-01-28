import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { type JSONBox } from './JSONBox/index';
import { leafs } from './leafs';
import { fromEntries } from './fromEntries';

export type JSONMapper = (entry: JSONEntry) => JSONEntry;

export const map =
  (mapper: JSONMapper, initial: JSONNode | JSONBox = {}) =>
  (node: JSONNode | JSONBox | undefined): JSONNode =>
    fromEntries(
      initial,
      leafs(node).map(_ => mapper(_))
    );
