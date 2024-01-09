import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { type JSONPath } from './JSONPath';
import { init } from './fp/init';
import { get } from './get';

export const parent = (target: JSONNode, path: JSONPath): JSONEntry => [init(path), get(target, init(path))!];
