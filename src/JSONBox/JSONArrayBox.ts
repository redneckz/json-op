import { isJSONArray, type JSONArray, type JSONNode } from '../JSONNode';
import { JSONPathElement } from '../JSONPath';
import { JSONBox } from './JSONBox';

export class JSONArrayBox extends JSONBox<JSONArray> {
  entries(): [p: JSONPathElement, child: JSONBox][] {
    return (this._ ?? []).map((node, p) => [p, this.of(node)]);
  }
  size() {
    return this._?.length ?? 0;
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(typeof p === 'number' ? this._?.[p] : undefined);
  }
  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
    return this.of(
      isJSONArray(this._)
        ? Array.from({ length: Math.max(this._.length, Number(p) + 1) }, (x, i) => (i === p ? child : this._![i]))
        : Array.from({ length: Number(p) + 1 }, (x, i) => (i === p ? child : undefined))
    );
  }
}
