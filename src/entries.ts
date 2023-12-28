import { type JSONNode } from './JSONNode';
import { type JSONPath } from './JSONPath';
import { reduce } from './reduce';

export type JSONEntry = [JSONPath, JSONNode];

export const entries = (node: JSONNode): JSONEntry[] =>
  reduce((acc: JSONEntry[], node, path) => [...acc, [path, node] as JSONEntry])(node, []);
