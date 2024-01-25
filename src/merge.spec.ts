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

  describe('with custom JSONBox', () => {
    class Box extends JSONBoxDefault {
      static readonly ID_PREFIX = 'id:';
      static id = (node: JSONNode | undefined): string | undefined =>
        isJSONRecord(node) && 'id' in node ? `${Box.ID_PREFIX}${node.id}` : undefined;

      entries(): Array<[p: JSONPathElement, child: JSONBox]> {
        return isJSONArray(this._)
          ? this._.map((node, i) => [Box.id(node) ? Box.id(node)! : i, new Box(node)])
          : super.entries();
      }

      get(p?: JSONPathElement): JSONBox {
        return super.get(this.findIndexById(p));
      }

      set(p: JSONPathElement | undefined, child: JSONNode): JSONBox {
        return super.set(this.findIndexById(p), child);
      }

      private findIndexById(p: JSONPathElement | undefined): JSONPathElement | undefined {
        if (typeof p === 'string' && p.startsWith(Box.ID_PREFIX) && isJSONArray(this._)) {
          const index = this._.findIndex(node => p === Box.id(node));
          return index >= 0 ? index : this._.length;
        }
        return p;
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
            pair(['a', `${Box.ID_PREFIX}new`, 'id'], 'new'),
            pair(['a', `${Box.ID_PREFIX}new`, 'foo'], 'new')
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
