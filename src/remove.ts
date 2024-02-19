import { boxed, type JSONBox } from './JSONBox/index';
import { type JSONPath } from './JSONPath';

export const remove = boxed(
  (target: JSONBox, [p, ...tail]: JSONPath): JSONBox =>
    tail.length ? target.set(p, remove(target.get(p), tail)) : target.filter(([i]) => i !== p)
);
