import { JSONBoxDefault, type JSONBox } from './JSONBox/index';
import { isJSONArray, isJSONRecord, type JSONNode } from './JSONNode';
import { type JSONPathElement } from './JSONPath';
import { pair } from './fp/index';
import { fromEntries } from './fromEntries';

describe('fromEntries', () => {
  it('should combine all entries to object', () => {
    expect(fromEntries({}, [pair(['foo'], 123), pair(['bar'], 456)])).toEqual({ foo: 123, bar: 456 });
  });

  it('should combine all entries to array', () => {
    expect(fromEntries([], [pair([0, 'foo'], 123), pair([1, 'bar'], 456)])).toEqual([{ foo: 123 }, { bar: 456 }]);
  });

  it('should respect order of entries', () => {
    expect(fromEntries({}, [pair(['foo'], 123), pair(['foo'], 456)])).toEqual({ foo: 456 });
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
        fromEntries(new Box([]), [
          pair([`${Box.ID_PREFIX}foo`, 'id'], 'foo'),
          pair([`${Box.ID_PREFIX}foo`, 'foo'], 123)
        ])
      ).toEqual([{ id: 'foo', foo: 123 }]);
    });
  });
});
