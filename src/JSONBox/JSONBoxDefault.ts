import { isJSONArray, isJSONRecord, type JSONNode } from '../JSONNode';
import { type JSONPathElement } from '../JSONPath';
import { table, trueF } from '../fp/index';
import { JSONArrayBox } from './JSONArrayBox';
import { JSONBox } from './JSONBox';
import { JSONRecordBox } from './JSONRecordBox';
import { JSONScalarBox } from './JSONScalarBox';

export class JSONBoxDefault<N extends JSONNode = JSONNode> extends JSONBox<N> {
  private readonly proto = table<[p: JSONPathElement | undefined], JSONBox>(
    [p => isJSONArray(this._) || typeof p === 'number', () => JSONArrayBox.prototype],
    [p => isJSONRecord(this._) || typeof p === 'string', () => JSONRecordBox.prototype],
    [trueF, () => JSONScalarBox.prototype]
  );

  entries(): Array<[p: JSONPathElement, child: JSONBox]> {
    return this.proto(undefined).entries.call(this);
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.proto(p).get.call(this, p);
  }

  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
    return this.proto(p).set.call(this, p, child);
  }
}
