import { JSONBox, boxed } from './JSONBox/index';
import { type JSONEntry } from './JSONEntry';
import { set } from './set';

export const fromEntries = boxed((initial: JSONBox, tree: JSONEntry[]): JSONBox => tree.reduce(set.fn, initial));
