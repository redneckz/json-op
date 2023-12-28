import { isJSONScalar, isJSONRecord, isJSONLeaf } from './JSONNode';

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

  describe('isJSONLeaf', () => {
    it('should return true if scalar is provided', () => {
      expect.assertions(3);
      expect(isJSONLeaf('')).toBe(true);
      expect(isJSONLeaf(0)).toBe(true);
      expect(isJSONLeaf(false)).toBe(true);
    });

    it('should return true if empty object is provided', () => {
      expect.assertions(2);
      expect(isJSONLeaf({})).toBe(true);
      expect(isJSONLeaf({ foo: 123 })).toBe(false);
    });

    it('should return true if empty array is provided', () => {
      expect.assertions(2);
      expect(isJSONLeaf([])).toBe(true);
      expect(isJSONLeaf([123])).toBe(false);
    });
  });
});
