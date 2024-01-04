import { zip } from './zip';

describe('zip', () => {
  it('should return pairs produced from corresponding values of provided lists', () => {
    expect(zip([1, 2, 3], ['A', 'B', 'C'])).toEqual([
      [1, 'A'],
      [2, 'B'],
      [3, 'C']
    ]);
  });

  it('should be identical to cross join operation', () => {
    expect(zip([1, 2, 3], ['A'])).toEqual([
      [1, 'A'],
      [2, undefined],
      [3, undefined]
    ]);
  });
});
