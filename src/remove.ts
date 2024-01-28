import { type JSONBox } from './JSONBox/index';
import { type JSONNode } from './JSONNode';
import { startsWith, type JSONPath } from './JSONPath';
import { leafs } from './leafs';
import { not, t0 } from './fp/index';
import { fromEntries } from './fromEntries';

export const remove = (
  target: JSONNode | JSONBox | undefined,
  path: JSONPath,
  initial: JSONNode | JSONBox = {}
): JSONNode => fromEntries(initial, leafs(target).filter(t0(not(startsWith(path)))));
