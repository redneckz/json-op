import { DEFAULT_DISCRIMINATOR } from './JSONDiscriminator';
import { type JSONEntry } from './JSONEntry';
import { type JSONNode } from './JSONNode';
import { leafs } from './entries';
import { fromEntries } from './fromEntries';

export const merge = <S extends JSONNode>(source: S, delta: JSONNode, discriminator = DEFAULT_DISCRIMINATOR): S =>
  fromEntries(
    [...leafs(source), ...leafs(delta).map(([path, _]): JSONEntry => [discriminator(delta, path)(source)[0], _])],
    {}
  ) as S;
