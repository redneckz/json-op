import { type JSONNode } from '../JSONNode';
import { type JSONPathElement } from '../JSONPath';
import { Predicate } from '../fp/Predicate';

export type JSONBoxEntry<Child extends JSONNode | JSONBox = JSONBox> = [p: JSONPathElement, child: Child];

type JSONBoxCtor<N extends JSONNode = JSONNode> = new (_: N | undefined) => JSONBox<N>;

export abstract class JSONBox<N extends JSONNode = JSONNode> {
  constructor(readonly _?: N | undefined) {}

  abstract from(entries: JSONBoxEntry<JSONNode | JSONBox>[]): JSONBox<N>;
  abstract entries(): JSONBoxEntry[];
  abstract size(): number;

  abstract get(p?: JSONPathElement | undefined): JSONBox;
  abstract set(p: JSONPathElement | undefined, child: JSONNode): JSONBox<N>;

  of<N extends JSONNode>(_: JSONBox<N> | N | undefined): JSONBox<N> {
    return new (this.constructor as JSONBoxCtor<N>)(_ instanceof JSONBox ? _._ : _);
  }

  filter(predicate: Predicate<[JSONBoxEntry]>): JSONBox<N> {
    return this.from(this.entries().filter(predicate));
  }
  map(mapper: (entry: JSONBoxEntry) => JSONBoxEntry<JSONNode>): JSONBox<N> {
    return this.from(this.entries().map(mapper));
  }
  flatMap(mapper: (entry: JSONBoxEntry) => JSONBoxEntry<JSONNode>[]): JSONBox<N> {
    return this.from(this.entries().flatMap(mapper));
  }
  reduce<R>(reducer: (this: JSONBox, acc: R, entry: JSONBoxEntry) => R, initial: R) {
    return this.entries().reduce(reducer.bind(this), initial);
  }
}
