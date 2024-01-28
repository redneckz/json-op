import { unbox, type JSONBox, type JSONLeafBox } from './JSONBox/index';
import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { reduce } from './reduce';

export const leafs = (node: JSONNode | JSONBox | undefined): JSONEntry[] =>
  reduce((acc: JSONEntry[], [path, _]) => (isLeaf(_) ? [...acc, [path, unbox(_)] as JSONEntry] : acc))(node, []);

const isLeaf = (_: JSONBox): _ is JSONLeafBox => _.size() === 0;
