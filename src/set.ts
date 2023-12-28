import type { JSONArray, JSONRecord, JSONNode } from './JSONNode';
import { type JSONPathElement } from './JSONPath';
import { type JSONEntry } from './entries';
import { get } from './get';

export const set = (target: JSONNode, [path, node]: JSONEntry): JSONNode =>
  path.reduceRight((acc, p, i) => setTo(get(target, path.slice(0, i)), p)(acc), node);

const setTo = (target: JSONNode, p: JSONPathElement) =>
  typeof p === 'number' ? setToArray(target as JSONArray, p) : setToRecord(target as JSONRecord, p);

const setToArray = (target: JSONArray, p: number) => (value: JSONNode) =>
  Array.from({ length: Math.max(p + 1, target?.length || 0) }, (_, i) => (i === p ? value : target?.[i]));

const setToRecord = (target: JSONRecord, p: string) => (value: JSONNode) => ({
  ...target,
  [p]: value
});
