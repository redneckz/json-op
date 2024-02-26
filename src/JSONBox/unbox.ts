import { type JSONNode } from '../JSONNode';
import { JSONBox } from './JSONBox';

export function unbox(box: undefined): undefined;
export function unbox(box: JSONNode | JSONBox): JSONNode;
export function unbox(box: JSONNode | JSONBox | undefined): JSONNode | undefined {
  return box instanceof JSONBox ? box._ : box;
}
