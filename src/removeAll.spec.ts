import { removeAll } from './removeAll';

describe('removeAll', () => {
  it('should remove the whole subtree', () => {
    const pathToRemove = ['foo'];
    expect(removeAll({ foo: [1, 2, { bar: 3 }], baz: 123 }, [pathToRemove])).toEqual({ baz: 123 });
  });

  it('should remove the whole subtree for each provided path', () => {
    const pathToRemove1 = ['foo', 0];
    const pathToRemove2 = ['foo', 2];
    expect(removeAll({ foo: [1, 2, { bar: 3 }] }, [pathToRemove1, pathToRemove2])).toEqual({ foo: [undefined, 2] });
  });
});
