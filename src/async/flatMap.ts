import { type JSONBox } from '../JSONBox/index';
import { type JSONEntry } from '../JSONEntry';
import { type JSONNode } from '../JSONNode';
import { fromEntries } from '../fromEntries';
import { leafs } from '../leafs';
import { fulfilled } from './fulfilled';

export type JSONMapper = (entry: JSONEntry) => JSONEntry[] | Promise<JSONEntry[]>;

export const flatMap =
  (mapper: JSONMapper, initial: JSONNode | JSONBox = {}) =>
  async (node: JSONNode | JSONBox | undefined): Promise<JSONNode> =>
    fromEntries(initial, (await fulfilled(leafs(node).map(_ => mapper(_)))).flat());
