import { type JSONNode } from './JSONNode';
import { startsWith, type JSONPath } from './JSONPath';
import { leafs } from './entries';
import { not } from './fp/not';
import { t0 } from './fp/tuple';
import { fromEntries } from './fromEntries';

export const remove = (target: JSONNode, path: JSONPath, initial: JSONNode = {}): JSONNode =>
  fromEntries(leafs(target).filter(t0(not(startsWith(path)))), initial);
