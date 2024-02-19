import { type JSONBox } from './JSONBox/index';
import { type JSONNode } from './JSONNode';
import { startsWith, type JSONPath } from './JSONPath';
import { not, some } from './fp/Predicate';
import { t0 } from './fp/tuple';
import { fromEntries } from './fromEntries';
import { leafs } from './leafs';

export const removeAll = (
  target: JSONNode | JSONBox | undefined,
  pathList: JSONPath[],
  initial: JSONNode | JSONBox = {}
): JSONNode => fromEntries(initial, leafs(target).filter(t0(not(some(pathList.map(startsWith))))));
