import { set } from './set';

describe('set', () => {
  it('should set value on path', () => {
    expect(set({ bar: 456 }, [['foo'], 123])).toEqual({ foo: 123, bar: 456 });
  });

  it('should override value on path', () => {
    expect(set({ foo: 456 }, [['foo'], 123])).toEqual({ foo: 123 });
  });

  it('should set value on path regardless of depth', () => {
    expect(set({ foo: { bar: [0, 1] } }, [['foo', 'bar', 1], 123])).toEqual({
      foo: { bar: [0, 123] }
    });
  });

  it('should set value on path filling required gaps', () => {
    expect(set({ plugh: 0 }, [['foo', 'bar', 0, 'baz'], 123])).toEqual({
      plugh: 0,
      foo: { bar: [{ baz: 123 }] }
    });
  });
});
