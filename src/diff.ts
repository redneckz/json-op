import { DEFAULT_DISCRIMINATOR } from './JSONDiscriminator';
import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { leafs } from './entries';

export const diff = (source: JSONNode, target: JSONNode, discriminator = DEFAULT_DISCRIMINATOR): JSONEntry[] =>
  leafs(target).filter(([path, _]: JSONEntry) => discriminator(target, path)(source)[1] !== _);
