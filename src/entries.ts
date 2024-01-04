import { type JSONEntry } from './JSONEntry';
import { isJSONLeaf, type JSONNode } from './JSONNode';
import { t1 } from './fp/tuple';
import { reduce } from './reduce';

export const entries = (node: JSONNode): JSONEntry[] =>
  reduce((acc: JSONEntry[], entry) => [...acc, entry])(node, []);

export const leafs = (node: JSONNode): JSONEntry[] => entries(node).filter(t1(isJSONLeaf));
