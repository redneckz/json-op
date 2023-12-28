/* eslint-disable @typescript-eslint/no-explicit-any */
import { isJSONArray, isJSONRecord, type JSONNode } from './JSONNode';
import { ROOT } from './JSONPath';

export const get = (target: JSONNode, path = ROOT): JSONNode =>
  path.reduce((res, p) => (isJSONArray(res) || isJSONRecord(res) ? (res as any)[p] : null), target);
