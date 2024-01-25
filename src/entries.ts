import { type JSONEntry } from './JSONEntry';
import { isJSONLeaf, type JSONNode } from './JSONNode';
import { type JSONBox } from './JSONBox/index';
import { t1 } from './fp/index';
import { reduce } from './reduce';

export const entries = (node: JSONNode | JSONBox | undefined): JSONEntry[] =>
  reduce((acc: JSONEntry[], entry) => [...acc, entry])(node, []);

export const leafs = (node: JSONNode | JSONBox | undefined): JSONEntry[] => entries(node).filter(t1(isJSONLeaf));
