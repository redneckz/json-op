import { type JSONNode } from '../JSONNode';
import { JSONPathElement } from '../JSONPath';
import { JSONBox } from './JSONBox';

export class JSONLeafBox extends JSONBox<JSONNode> {
  entries(): [p: JSONPathElement, child: JSONBox][] {
    return [];
  }
  size() {
    return 0;
  }

  get(p?: JSONPathElement | undefined): JSONBox {
    return this.of(p !== undefined ? undefined /* no childs */ : this._ /* self */);
  }
  set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
    return this.of(child);
  }
}
