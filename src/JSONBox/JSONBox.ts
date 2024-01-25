import { type JSONNode } from '../JSONNode';
import { type JSONPathElement } from '../JSONPath';

export abstract class JSONBox<N extends JSONNode = JSONNode> {
  constructor(readonly _?: N | undefined) {}

  abstract entries(): Array<[p: JSONPathElement, child: JSONBox]>;

  abstract get(p?: JSONPathElement | undefined): JSONBox;
  abstract set(p: JSONPathElement | undefined, child: JSONNode): JSONBox;

  of(_: JSONNode | undefined): JSONBox {
    return new (this.constructor as new (_: JSONNode | undefined) => JSONBox)(_);
  }
}
