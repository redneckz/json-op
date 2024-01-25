import { JSONBoxDefault } from './JSONBoxDefault';

describe('JSONBoxDefault', () => {
  it('should wrap JSON nodes', () => {
    const node = {};
    const scalar = new JSONBoxDefault(node);

    expect(scalar._).toBe(node);
  });

  describe('entries', () => {
    it('should return no entries for scalar nodes', () => {
      const scalar = new JSONBoxDefault(123);

      expect(scalar.entries()).toEqual([]);
    });
  });

  describe('get', () => {
    it('should return the same box for scalar values and empty key', () => {
      const scalar = new JSONBoxDefault(123);

      expect(scalar.get()._).toBe(123);
    });
  });

  describe('set', () => {
    it('should override scalar values with empty key', () => {
      const scalar = new JSONBoxDefault(123);

      expect(scalar.set(undefined, 456)._).toBe(456);
    });
  });
});
