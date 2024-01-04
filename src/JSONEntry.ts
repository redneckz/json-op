import { type JSONNode } from './JSONNode';
import { type JSONPath } from './JSONPath';

export type JSONEntry = [JSONPath, JSONNode];
export type JSONEntryNil = [JSONPath, undefined];
