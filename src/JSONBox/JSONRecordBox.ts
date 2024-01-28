import { type JSONNode, type JSONRecord } from '../JSONNode';
import { JSONPathElement } from '../JSONPath';
import { JSONBox } from './JSONBox';

export class JSONRecordBox extends JSONBox<JSONRecord> {
  entries(): [p: JSONPathElement, child: JSONBox][] {
    return Object.entries(this._ ?? {}).map(([p, node]) => [p, this.of(node)]);
  }
  size() {
    return Object.keys(this._ ?? {}).length;
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(typeof p === 'string' ? this._?.[p] : undefined);
  }
  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
    return this.of({ ...this._, [p as string]: child });
  }
}
