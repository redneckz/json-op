import { remove } from './remove';

describe('remove', () => {
  it('should remove all entries associated with provided path', () => {
    expect(remove({ foo: [1, 2, { bar: 3 }] }, ['foo', 2])).toEqual({ foo: [1, 2] });
  });

  it('should remove array elements', () => {
    expect(remove({ foo: [1, 2, { bar: 3 }] }, ['foo', 1])).toEqual({ foo: [1, { bar: 3 }] });
  });
});
