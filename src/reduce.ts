import { box, type JSONBox } from './JSONBox/index';
import { type JSONEntryBox } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { ROOT, type JSONPath } from './JSONPath';

export const reduce =
  <R>(reducer: (acc: R, entry: JSONEntryBox) => R) =>
  (node: JSONBox | JSONNode | undefined, initial: R, path: JSONPath = ROOT): R =>
    box(node)
      .entries()
      .reduce((acc, [p, _]) => reduce(reducer)(_, acc, path.concat(p)), reducer(initial, [path, box(node)]));
