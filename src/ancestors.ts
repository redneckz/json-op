/* eslint-disable @typescript-eslint/no-explicit-any */
import { isJSONArray, isJSONRecord, type JSONNode } from './JSONNode';
import { ROOT } from './JSONPath';
import { last } from './fp/last';

export const ancestors = (target: JSONNode, path = ROOT): [...ancestors: JSONNode[], leaf: JSONNode] =>
  path.reduce((_, p) => [..._, isJSONArray(last(_)) || isJSONRecord(last(_)) ? (last(_) as any)[p] : undefined], [
    target
  ] as [...JSONNode[], JSONNode]);
