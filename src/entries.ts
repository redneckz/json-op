import { unbox, type JSONBox } from './JSONBox/index';
import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { reduce } from './reduce';

export const entries = (node: JSONNode | JSONBox | undefined): JSONEntry[] =>
  reduce((acc: JSONEntry[], [path, _]) => [...acc, [path, unbox(_)] as JSONEntry])(node, []);
