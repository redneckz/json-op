import { type JSONNode } from '../JSONNode';
import { JSONBox } from './JSONBox';
import { JSONBoxDefault } from './JSONBoxDefault';

export const box = (_: JSONNode | JSONBox | undefined): JSONBox => (_ instanceof JSONBox ? _ : new JSONBoxDefault(_));

export function unbox(box: undefined): undefined;
export function unbox(box: JSONNode | JSONBox): JSONNode;
export function unbox(box: JSONNode | JSONBox | undefined): JSONNode | undefined {
  return box instanceof JSONBox ? box._ : box;
}

export const boxed = <Args extends unknown[]>(fn: (box: JSONBox, ...args: Args) => JSONBox) => {
  const boxedFn = (node: JSONNode | JSONBox | undefined, ...args: Args) => unbox(fn(box(node), ...args)!);
  boxedFn.fn = fn;
  return boxedFn;
};
