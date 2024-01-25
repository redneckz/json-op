import { type JSONEntry } from '../JSONEntry';
import { type JSONNode } from '../JSONNode';
import { type JSONBox } from '../JSONBox/index';
import { leafs } from '../entries';
import { fromEntries } from '../fromEntries';
import { fulfilled } from './xsync';

export type JSONMapper = (entry: JSONEntry) => JSONEntry | Promise<JSONEntry>;

export const map =
  (mapper: JSONMapper, initial: JSONNode | JSONBox = {}) =>
  async (node: JSONNode | JSONBox | undefined): Promise<JSONNode> =>
    fromEntries(initial, await fulfilled(leafs(node).map(_ => mapper(_))));
