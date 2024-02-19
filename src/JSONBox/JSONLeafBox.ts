import { type JSONNode } from '../JSONNode';
import { JSONPathElement } from '../JSONPath';
import { JSONBox, type JSONBoxEntry } from './JSONBox';

export class JSONLeafBox extends JSONBox<JSONNode> {
  from() {
    return this;
  }
  entries(): JSONBoxEntry[] {
    return [];
  }
  size() {
    return 0;
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(p !== undefined ? undefined /* no childs */ : this._ /* self */);
  }
  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox<JSONNode> {
    return this.of(child);
  }
}
