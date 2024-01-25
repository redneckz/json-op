import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { type JSONBox } from './JSONBox/index';
import { entries } from './entries';

export const find =
  (predicate: (entry: JSONEntry) => boolean) =>
  (node: JSONNode | JSONBox | undefined): JSONEntry | undefined =>
    entries(node).find(predicate);
