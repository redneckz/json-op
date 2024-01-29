import { JSONBoxDefault, type JSONBox } from './JSONBox/index';
import { isJSONArray, isJSONRecord, type JSONNode, type JSONRecord } from './JSONNode';
import { type JSONPathElement } from './JSONPath';
import { diff } from './diff';
import { pair } from './fp/index';
import { merge } from './merge';

describe('merge', () => {
  it('should override fields', () => {
    expect(merge({ foo: 123 }, [pair(['foo'], 456)])).toEqual({ foo: 456 });
  });

  it('should append new fields', () => {
    expect(merge({ foo: 123 }, [pair(['bar'], 456)])).toEqual({ foo: 123, bar: 456 });
  });

  it('should merge arrays as well', () => {
    expect(merge([{ foo: 123 }, { foo: 456 }], [pair([0, 'bar'], 123), pair([1, 'bar'], 456), pair([2], {})])).toEqual([
      { foo: 123, bar: 123 },
      { foo: 456, bar: 456 },
      {}
    ]);
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

      set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
        const id = Box.keyToId(p);
        const index = this.findIndexById(id);
        const adjustedIndex = index >= 0 ? index : this.size();
        return super.set(id ? adjustedIndex : p, id ? { ...(child as JSONRecord), id } : child);
      }

      private findIndexById(id: string | undefined): number | -1 {
        return id && isJSONArray(this._) ? this._.findIndex(node => id === Box.nodeId(node)) : -1;
      }
    }

    it('should respect custom JSONBox', () => {
      expect(
        merge(
          new Box({
            a: [
              { id: '123', foo: 123 },
              { id: '456', baz: 123 }
            ]
          }),
          [pair(['a', `${Box.ID_PREFIX}456`, 'bar'], 456), pair(['a', `${Box.ID_PREFIX}123`, 'foo'], 456)]
        )
      ).toEqual({
        a: [
          { id: '123', foo: 456 },
          { id: '456', baz: 123, bar: 456 }
        ]
      });
    });

    it('should work as inverse function of "diff"', () => {
      const source: JSONRecord = {
        a: [
          { id: '123', foo: [1, 2, 3] },
          { id: '456', baz: 123 }
        ]
      };
      const target: JSONRecord = {
        a: [
          { id: '123', foo: [1, 0, 3] },
          { id: '456', baz: 123, bar: 456 }
        ]
      };

      // source + (target - source) = target
      expect(merge(new Box(source), diff(new Box(source), new Box(target)))).toEqual(target);
    });

    it('should append new values to array', () => {
      expect(
        merge(
          new Box({
            a: [
              { id: '123', foo: 123 },
              { id: '456', baz: 123 }
            ]
          }),
          [
            pair(['a', `${Box.ID_PREFIX}123`, 'foo'], 456),
            pair(['a', `${Box.ID_PREFIX}new`, 'foo'], 'new'),
            pair(['a', `${Box.ID_PREFIX}new`, 'id'], 'new')
          ]
        )
      ).toEqual({
        a: [
          { id: '123', foo: 456 },
          { id: '456', baz: 123 },
          { id: 'new', foo: 'new' }
        ]
      });
    });
  });
});
