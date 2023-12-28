import { type JSONNode } from './JSONNode';
import { type JSONEntry } from './entries';
import { set } from './set';

export const fromEntries = <T extends JSONNode>(tree: JSONEntry[], initial: T): T =>
  tree.reduce(set, initial) as T;
