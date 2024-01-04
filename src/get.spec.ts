import { get } from './get';

describe('get', () => {
  it('should return json node on path', () => {
    expect(get({ foo: 123 }, ['foo'])).toBe(123);
  });

  it('should return provided node for root path', () => {
    expect(get({ foo: 123 }, [])).toEqual({ foo: 123 });
  });

  it('should return json node on path regardless of depth', () => {
    expect(get({ foo: [123, { bar: 456 }] }, ['foo', 1, 'bar'])).toBe(456);
  });

  it('should return null if nothing found', () => {
    expect(get({ foo: 123 }, ['foo', 0])).toBe(undefined);
  });
});
