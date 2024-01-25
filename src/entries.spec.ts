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

  it('should return the only leaf for scalar node', () => {
    expect(entries(123)).toEqual([[ROOT, 123]]);
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

    it('should return the only leaf for scalar node', () => {
      expect(leafs(123)).toEqual([[ROOT, 123]]);
    });
  });
});
