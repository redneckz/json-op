import { ancestors } from './ancestors';

describe('ancestors', () => {
  it('should return json node on path', () => {
    expect(ancestors({ foo: 123 }, ['foo'])).toEqual([{ foo: 123 }, 123]);
  });

  it('should return provided node for root path', () => {
    expect(ancestors({ foo: 123 }, [])).toEqual([{ foo: 123 }]);
  });

  it('should return json node on path regardless of depth', () => {
    expect(ancestors({ foo: [123, { bar: 456 }] }, ['foo', 1, 'bar'])).toEqual([
      { foo: [123, { bar: 456 }] },
      [123, { bar: 456 }],
      { bar: 456 },
      456
    ]);
  });

  it('should return null if nothing found', () => {
    expect(ancestors({ foo: 123 }, ['foo', 0])).toEqual([{ foo: 123 }, 123, undefined]);
  });
});
