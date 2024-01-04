import { type JSONNode } from './JSONNode';
import { ROOT } from './JSONPath';
import { ancestors } from './ancestors';
import { last } from './fp/last';

export const get = (target: JSONNode, path = ROOT): JSONNode | undefined => last(ancestors(target, path));
