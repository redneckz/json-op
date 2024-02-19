import { JSONBoxDefault } from './JSONBoxDefault';

describe('JSONBoxDefault', () => {
  it('should wrap JSON nodes', () => {
    const node = {};
    const box = new JSONBoxDefault(node);

    expect(box._).toBe(node);
  });

  describe('entries', () => {
    it('should return no entries for scalar nodes', () => {
      const box = new JSONBoxDefault(123);

      expect(box.entries()).toEqual([]);
    });
  });

  describe('get', () => {
    it('should return the same box for scalar values and empty key', () => {
      const box = new JSONBoxDefault(123);

      expect(box.get()._).toBe(123);
    });
  });

  describe('set', () => {
    it('should override scalar values with empty key', () => {
      const box = new JSONBoxDefault(123);

      expect(box.set(undefined, 456)._).toBe(456);
    });
  });

  describe('filter', () => {
    it('should filter array values', () => {
      const box = new JSONBoxDefault([1, 2, 3, 4, 5]);

      expect(box.filter(([, _]) => (_._ as number) % 2 === 0)._).toEqual([2, 4]);
    });

    it('should filter record entries', () => {
      const box = new JSONBoxDefault({ foo: 1, bar: 2, baz: 3 });

      expect(box.filter(([, { _ }]) => (_ as number) % 2 === 0)._).toEqual({ bar: 2 });
    });
  });

  describe('map', () => {
    it('should map array values', () => {
      const box = new JSONBoxDefault([1, 2, 3]);

      expect(box.map(([p, _]) => [p, (_._ as number) ** 2])._).toEqual([1, 4, 9]);
    });

    it('should map record entries', () => {
      const box = new JSONBoxDefault({ foo: 1, bar: 2, baz: 3 });

      expect(box.map(([p, _]) => [p, (_._ as number) ** 2])._).toEqual({ foo: 1, bar: 4, baz: 9 });
    });
  });
});
