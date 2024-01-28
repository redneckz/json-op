import { ROOT } from './JSONPath';
import { leafs } from './leafs';

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
