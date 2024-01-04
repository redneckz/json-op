import { ROOT } from './JSONPath';
import { entries, leafs } from './entries';

describe('entries', () => {
  it('should return every and each node of JSON tree as a list of entries', () => {
    const foo = [123, 456];
    const plugh = 'baz';

    expect(entries({ foo, plugh })).toEqual([
      [ROOT, { foo, plugh }],
      [['foo'], foo],
      [['foo', 0], 123],
      [['foo', 1], 456],
      [['plugh'], plugh]
    ]);
  });

  it('should return the only entry if simple node (leaf) is provided', () => {
    expect(entries('foo')).toEqual([[ROOT, 'foo']]);
  });

  describe('leafs', () => {
    it('should return every and each leaf node of JSON tree', () => {
      const foo = [123, 456];
      const plugh = 'baz';

      expect(leafs({ foo, plugh, nil: null })).toEqual([
        [['foo', 0], 123],
        [['foo', 1], 456],
        [['plugh'], plugh],
        [['nil'], null]
      ]);
    });
  });
});
