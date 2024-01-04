import { type JSONEntry } from './JSONEntry';
import { JSONNode } from './JSONNode';
import { entries } from './entries';

export const find =
  (predicate: (entry: JSONEntry) => boolean) =>
  (node: JSONNode): JSONEntry | undefined =>
    entries(node).find(predicate);
