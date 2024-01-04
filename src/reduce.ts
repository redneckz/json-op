import { type JSONEntry } from './JSONEntry';
import { isJSONArray, isJSONRecord, type JSONNode } from './JSONNode';
import { ROOT } from './JSONPath';

export const reduce =
  <R>(reducer: (acc: R, entry: JSONEntry) => R) =>
  (node: JSONNode, initial: R, path = ROOT): R => {
    const next = reducer(initial, [path, node]);
    if (isJSONArray(node)) {
      return node.reduce((acc, _, i) => reduce(reducer)(_, acc, path.concat(i)), next);
    } else if (isJSONRecord(node)) {
      return Object.entries(node).reduce((acc, [k, _]) => reduce(reducer)(_, acc, path.concat(k)), next);
    } else {
      return next;
    }
  };
