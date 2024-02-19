import { type JSONNode, type JSONRecord } from '../JSONNode';
import { type JSONPathElement } from '../JSONPath';
import { JSONBox, type JSONBoxEntry } from './JSONBox';
import { unbox } from './boxed';

export class JSONRecordBox extends JSONBox<JSONRecord> {
  from(entries: JSONBoxEntry<JSONNode | JSONBox>[]): JSONBox<JSONRecord> {
    return this.of(Object.fromEntries(entries.map(([p, box]): [JSONPathElement, JSONNode] => [p, unbox(box)])));
  }
  entries(): JSONBoxEntry[] {
    return Object.entries(this._ ?? {}).map(([p, node]) => [p, this.of(node)]);
  }
  size() {
    return Object.keys(this._ ?? {}).length;
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(typeof p === 'string' ? this._?.[p] : undefined);
  }
  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox<JSONRecord> {
    return this.of({ ...this._, [p as string]: child });
  }
}
