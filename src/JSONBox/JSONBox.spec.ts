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
});
