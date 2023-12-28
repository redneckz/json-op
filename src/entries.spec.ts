import { ROOT } from './JSONPath';
import { entries } from './entries';

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
});
