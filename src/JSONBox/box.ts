import { type JSONNode } from '../JSONNode';
import { JSONBox } from './JSONBox';
import { JSONBoxDefault } from './JSONBoxDefault';

export const box = (_: JSONNode | JSONBox | undefined): JSONBox => (_ instanceof JSONBox ? _ : new JSONBoxDefault(_));
