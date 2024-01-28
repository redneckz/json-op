import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { type JSONBox } from './JSONBox/index';
import { leafs } from './leafs';
import { get } from './get';

export const diff = (source: JSONNode | JSONBox | undefined, target: JSONNode | JSONBox | undefined): JSONEntry[] =>
  leafs(target).filter(([path, _]: JSONEntry) => get(source, path) !== _);
