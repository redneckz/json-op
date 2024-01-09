import { startsWith, endsWith } from './JSONPath';

describe('JSONPath', () => {
  describe('startsWith', () => {
    it('should return true if path starts with provided prefix', () => {
      expect(startsWith(['foo', 0])(['foo', 0, 'bar'])).toBe(true);
    });

    it('should return true if prefix is ROOT', () => {
      expect(startsWith([])(['foo', 0, 'bar'])).toBe(true);
    });
  });

  describe('endsWith', () => {
    it('should return true if path ends with provided suffix', () => {
      expect(endsWith([0, 'bar'])(['foo', 0, 'bar'])).toBe(true);
    });

    it('should return false if path does not end with provided suffix', () => {
      expect(endsWith(['bar'])(['foo', 0, 'plugh'])).toBe(false);
    });
  });
});
