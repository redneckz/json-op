import { type JSONNull, type JSONNode, type JSONScalar } from '../JSONNode';
import { JSONPathElement } from '../JSONPath';
import { JSONBox } from './JSONBox';

export class JSONScalarBox extends JSONBox<JSONScalar | JSONNull> {
  entries(): [p: JSONPathElement, child: JSONBox][] {
    return [];
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(p !== undefined ? undefined /* no childs */ : this._ /* self */);
  }

  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
    return this.of(child);
  }
}
