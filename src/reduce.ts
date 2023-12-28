import { isJSONArray, isJSONRecord, type JSONNode } from './JSONNode';
import { type JSONPath, ROOT } from './JSONPath';

export const reduce =
  <R>(reducer: (acc: R, node: JSONNode, path: JSONPath) => R) =>
  (node: JSONNode, initial: R, path = ROOT): R => {
    const next = reducer(initial, node, path);
    if (isJSONArray(node)) {
      return node.reduce((acc, _, i) => reduce(reducer)(_, acc, path.concat(i)), next);
    } else if (isJSONRecord(node)) {
      return Object.entries(node).reduce((acc, [k, _]) => reduce(reducer)(_, acc, path.concat(k)), next);
    } else {
      return next;
    }
  };
