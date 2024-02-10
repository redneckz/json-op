import { trueF } from '../fp/Predicate';
import { table } from '../fp/table';
import { isJSONArray, isJSONRecord, type JSONNode } from '../JSONNode';
import { type JSONPathElement } from '../JSONPath';
import { JSONArrayBox } from './JSONArrayBox';
import { JSONBox } from './JSONBox';
import { JSONLeafBox } from './JSONLeafBox';
import { JSONRecordBox } from './JSONRecordBox';

export class JSONBoxDefault<N extends JSONNode = JSONNode> extends JSONBox<N> {
  private readonly proto = table<[p: JSONPathElement | undefined], JSONBox>(
    [p => isJSONArray(this._) || typeof p === 'number', () => JSONArrayBox.prototype],
    [p => isJSONRecord(this._) || typeof p === 'string', () => JSONRecordBox.prototype],
    [trueF, () => JSONLeafBox.prototype]
  );

  entries() {
    return this.proto(undefined).entries.call(this);
  }
  size() {
    return this.proto(undefined).size.call(this);
  }

  get(p?: JSONPathElement | undefined) {
    return this.proto(p).get.call(this, p);
  }
  set(p: JSONPathElement | undefined, child: JSONNode) {
    return this.proto(p).set.call(this, p, child);
  }
}
