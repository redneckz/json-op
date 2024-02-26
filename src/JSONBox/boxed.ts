import { type JSONNode } from '../JSONNode';
import { JSONBox } from './JSONBox';
import { box } from './box';
import { unbox } from './unbox';

export const boxed = <Args extends unknown[]>(fn: (box: JSONBox, ...args: Args) => JSONBox) => {
  const boxedFn = (node: JSONNode | JSONBox | undefined, ...args: Args) => unbox(fn(box(node), ...args)!);
  boxedFn.fn = fn;
  return boxedFn;
};
