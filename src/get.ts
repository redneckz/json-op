import { boxed, type JSONBox } from './JSONBox/index';
import { ROOT, type JSONPath } from './JSONPath';

export const get = boxed((target: JSONBox, path: JSONPath = ROOT): JSONBox => path.reduce((_, p) => _.get(p), target));
