import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { type JSONBox } from './JSONBox/index';
import { type JSONPath } from './JSONPath';
import { init } from './fp/index';
import { get } from './get';

export const parent = (target: JSONNode | JSONBox | undefined, path: JSONPath): JSONEntry => [
  init(path),
  get(target, init(path))!
];
