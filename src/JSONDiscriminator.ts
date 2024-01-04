import { type JSONEntryNil, type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { ROOT, type JSONPath, type JSONPathElement } from './JSONPath';
import { ancestors } from './ancestors';
import { init } from './fp/init';
import { zip } from './fp/zip';
import { get } from './get';

export type JSONDiscriminator = (source: JSONNode, path: JSONPath) => (target: JSONNode) => JSONEntry | JSONEntryNil;

export const DEFAULT_DISCRIMINATOR: JSONDiscriminator = (source, path) => target => [path, get(target, path)];

export const fromAncestors =
  (
    reducer: (result: JSONEntry | JSONEntryNil, ancestor: [JSONPathElement, JSONNode]) => JSONEntry | JSONEntryNil
  ): JSONDiscriminator =>
  (source, path) =>
  target =>
    init(zip(path, ancestors(source, path))).reduce(reducer, [ROOT, target]);
