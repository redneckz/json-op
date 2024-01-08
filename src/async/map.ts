import { type JSONEntry } from '../JSONEntry';
import { type JSONNode } from '../JSONNode';
import { leafs } from '../entries';
import { fromEntries } from '../fromEntries';
import { fulfilled } from './xsync';

export type JSONMapper = (entry: JSONEntry) => JSONEntry | Promise<JSONEntry>;

export const map =
  (mapper: JSONMapper, initial: JSONNode = {}) =>
  async (node: JSONNode): Promise<JSONNode> =>
    fromEntries(await fulfilled(leafs(node).map(_ => mapper(_))), initial);
