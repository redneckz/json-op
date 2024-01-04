import { type JSONEntry } from './JSONEntry';
import { map } from './map';

describe('map', () => {
  describe('sync', () => {
    const doubleNumbers = ([path, n]: JSONEntry): JSONEntry => [path, typeof n === 'number' ? 2 * n : n];

    it('should map scalars by means of mapper function', () => {
      expect(map(doubleNumbers)(123)).toEqual(2 * 123);
    });

    it('should map arrays by means of mapper function', () => {
      expect(map(doubleNumbers)([123, 456])).toEqual([2 * 123, 2 * 456]);
    });

    it('should map object values by means of mapper function', () => {
      expect(map(doubleNumbers)({ foo: 123, bar: 456 })).toEqual({ foo: 2 * 123, bar: 2 * 456 });
    });

    it('should map arbitrary structures by means of mapper function', () => {
      expect(map(doubleNumbers)({ foo: { bar: [123, 456], baz: true } })).toEqual({
        foo: { bar: [2 * 123, 2 * 456], baz: true }
      });
    });

    it('should provide full path to current node to mapper function', () => {
      expect.assertions(3);

      const mapper = jest.fn(_ => _);

      map(mapper)({ foo: { bar: 123 } });

      expect(mapper).toHaveBeenCalledWith([[], { foo: { bar: 123 } }]);
      expect(mapper).toHaveBeenCalledWith([['foo'], { bar: 123 }]);
      expect(mapper).toHaveBeenCalledWith([['foo', 'bar'], 123]);
    });
  });
});
