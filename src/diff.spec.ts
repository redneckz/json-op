import { JSONBoxDefault, type JSONBox } from './JSONBox/index';
import { isJSONArray, isJSONRecord, isJSONScalar, type JSONArray, type JSONNode } from './JSONNode';
import { JSONPathElement } from './JSONPath';
import { diff } from './diff';
import { pair } from './fp/index';

describe('diff', () => {
  it('should return an empty list if there is no difference', () => {
    const original = { a: 1, b: 2 };
    const modified = original;
    expect(diff(original, modified)).toEqual([]);
  });

  it('should return list of entries of distinct fields', () => {
    const original = { a: 1, b: 2 };
    const modified = { a: 1, b: 3 };
    expect(diff(original, modified)).toEqual([pair(['b'], 3)]);
  });

  it('should compute difference regardless of depth', () => {
    const original = { a: { x: 1, y: 2 } };
    const modified = { a: { x: 1, y: 3 } };
    expect(diff(original, modified)).toEqual([pair(['a', 'y'], 3)]);
  });

  it('should compute difference for arrays as well', () => {
    const original = { a: [1, 2, 3] };
    const modified = { a: [1, 5, 3] };
    expect(diff(original, modified)).toEqual([pair(['a', 1], 5)]);
  });

  describe('with custom JSONBox that overrides JSONArray indexing', () => {
    class Box extends JSONBoxDefault {
      static readonly ID_PREFIX = 'id:';

      static nodeId = (node: JSONNode | undefined): string | undefined =>
        isJSONRecord(node) && 'id' in node ? (node.id as string) : undefined;
      static keyToId = (p: JSONPathElement | undefined): string | undefined =>
        typeof p === 'string' && p.startsWith(Box.ID_PREFIX) ? p.substring(Box.ID_PREFIX.length) : undefined;

      entries(): Array<[p: JSONPathElement, child: JSONBox]> {
        return isJSONArray(this._)
          ? this._.map((node, i) => [Box.nodeId(node) ? `${Box.ID_PREFIX}${Box.nodeId(node)}` : i, new Box(node)])
          : super.entries();
      }

      get(p?: JSONPathElement): JSONBox {
        const id = Box.keyToId(p);
        return super.get(id ? this.findIndexById(id) : p);
      }

      private findIndexById(id: string | undefined): number | -1 {
        return id && isJSONArray(this._) ? this._.findIndex(node => id === Box.nodeId(node)) : -1;
      }
    }

    it('should respect custom JSONBox', () => {
      expect(
        diff(
          new Box({
            a: [
              { id: '123', foo: 123 },
              { id: '456', bar: 456 }
            ]
          }),
          new Box({
            a: [
              { id: '456', bar: 456 },
              { id: '123', foo: 456 }
            ]
          })
        )
      ).toEqual([pair(['a', `${Box.ID_PREFIX}123`, 'foo'], 456)]);
    });

    it('should respect new nodes from other sides', () => {
      expect(
        diff(
          new Box({
            a: [
              { id: '123', foo: 123 },
              { id: '456', baz: 123 }
            ]
          }),
          new Box({
            a: [
              { id: '123', foo: 456 },
              { id: '456', baz: 123 },
              { id: 'new', foo: 'new' }
            ]
          })
        )
      ).toEqual([
        pair(['a', `${Box.ID_PREFIX}123`, 'foo'], 456),
        pair(['a', `${Box.ID_PREFIX}new`, 'id'], 'new'),
        pair(['a', `${Box.ID_PREFIX}new`, 'foo'], 'new')
      ]);
    });
  });

  describe('with custom JSONBox that overrides leafs traversing strategy', () => {
    const isScalarArray = (node: JSONNode | undefined): node is JSONArray =>
      isJSONArray(node) && node.every(isJSONScalar);
    class Box extends JSONBoxDefault {
      entries(): Array<[p: JSONPathElement, child: JSONBox]> {
        return isScalarArray(this._) ? [] : super.entries();
      }
      size(): number {
        return isScalarArray(this._) ? 0 : super.size();
      }
    }

    it('should respect custom JSONBox', () => {
      expect(
        diff(
          new Box({
            a: [
              { id: '123', foo: [1, 2, 3] },
              { id: '456', bar: 456 }
            ]
          }),
          new Box({
            a: [
              { id: '123', foo: [4, 5, 6] },
              { id: '456', bar: 456 }
            ]
          })
        )
      ).toEqual([pair(['a', 0, 'foo'], [4, 5, 6])]);
    });
  });
});
