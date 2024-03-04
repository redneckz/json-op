import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { type JSONBox } from './JSONBox/index';
import { leafs } from './leafs';
import { get } from './get';

type DiffComparator = (a: JSONNode, b: JSONNode) => boolean
export const diff = (
  source: JSONNode | JSONBox | undefined,
  target: JSONNode | JSONBox | undefined,
  comparator: DiffComparator = (a, b) => a !== b
): JSONEntry[] =>
  leafs(target).filter(([path, _]: JSONEntry) => comparator(get(source, path), _))
