import { type JSONBox } from './JSONBox';
import { type JSONNode } from './JSONNode';
import { type JSONPath } from './JSONPath';

export type JSONEntry = [JSONPath, JSONNode];
export type JSONEntryNil = [JSONPath, undefined];

export type JSONEntryBox = [JSONPath, JSONBox];
