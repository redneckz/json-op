import { isJSONScalar, isJSONRecord } from './JSONNode';

describe('JSONNode', () => {
  describe('isJSONScalar', () => {
    it('should return true if string is provided', () => {
      expect(isJSONScalar('foo')).toBe(true);
    });

    it('should return true if boolean is provided', () => {
      expect(isJSONScalar(false)).toBe(true);
    });

    it('should return true if number is provided', () => {
      expect(isJSONScalar(123)).toBe(true);
    });

    it('should return false if null is provided', () => {
      expect(isJSONScalar(null)).toBe(false);
    });
  });

  describe('isJSONRecord', () => {
    it('should return true if object is provided', () => {
      expect(isJSONRecord({ foo: 123 })).toBe(true);
    });

    it('should return false if array is provided', () => {
      expect(isJSONRecord([123])).toBe(false);
    });

    it('should return false if null is provided', () => {
      expect(isJSONRecord(null)).toBe(false);
    });
  });
});
