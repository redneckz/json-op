import { type JSONEntry } from './JSONEntry';
import { boxed, type JSONBox } from './JSONBox/index';

export const set = boxed((target: JSONBox, [path, node]: JSONEntry): JSONBox => {
  const [p, ...tail] = path;
  return target.set(p, tail.length ? set(target.get(p), [tail, node]) : node);
});
