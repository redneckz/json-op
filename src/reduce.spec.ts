import { ROOT } from './JSONPath';
import { reduce } from './reduce';

describe('reduce', () => {
  it('should call reducer for each node', () => {
    expect.assertions(4);

    const reducer = jest.fn(_ => _);

    expect(reduce(reducer)({ foo: [123] }, 123)).toBe(123);
    expect(reducer).toHaveBeenCalledWith(123, [ROOT, { foo: [123] }]);
    expect(reducer).toHaveBeenCalledWith(123, [['foo'], [123]]);
    expect(reducer).toHaveBeenCalledWith(123, [['foo', 0], 123]);
  });
});
