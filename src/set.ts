import { type JSONEntry } from './JSONEntry';
import type { JSONArray, JSONNode, JSONRecord } from './JSONNode';
import { type JSONPathElement } from './JSONPath';
import { get } from './get';

export const set = (target: JSONNode, [path, node]: JSONEntry): JSONNode =>
  path.reduceRight((acc, p, i) => setTo(get(target, path.slice(0, i)), p)(acc), node);

const setTo = (target: JSONNode | undefined, p: JSONPathElement) =>
  typeof p === 'number' ? setToArray(target as JSONArray, p) : setToRecord(target as JSONRecord, p);

const setToArray =
  (target: JSONArray, p: number) =>
  (value: JSONNode | undefined): JSONArray =>
    Array.from({ length: Math.max(p + 1, target?.length || 0) }, (_, i) =>
      value !== undefined && i === p ? value : target?.[i]
    );

const setToRecord =
  (target: JSONRecord, p: string) =>
  (value: JSONNode | undefined): JSONRecord => ({
    ...target,
    ...(value !== undefined ? { [p]: value } : {})
  });
