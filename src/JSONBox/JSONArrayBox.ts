import { isJSONArray, type JSONArray, type JSONNode } from '../JSONNode';
import { JSONPathElement } from '../JSONPath';
import { t1 } from '../fp/tuple';
import { JSONBox, type JSONBoxEntry } from './JSONBox';
import { unbox } from './unbox';

export class JSONArrayBox extends JSONBox<JSONArray> {
  from(entries: JSONBoxEntry<JSONNode | JSONBox>[]): JSONBox<JSONArray> {
    return this.of(entries.map(t1(unbox)));
  }
  entries(): JSONBoxEntry[] {
    return (this._ ?? []).map((node, p) => [p, this.of(node)]);
  }
  size() {
    return this._?.length ?? 0;
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(typeof p === 'number' ? this._?.[p] : undefined);
  }
  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox<JSONArray> {
    return this.of(
      isJSONArray(this._)
        ? Array.from({ length: Math.max(this._.length, Number(p) + 1) }, (x, i) => (i === p ? child : this._![i]))
        : Array.from({ length: Number(p) + 1 }, (x, i) => (i === p ? child : undefined))
    );
  }
}
