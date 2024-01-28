import { pair } from './fp/index';
import { fromEntries } from './fromEntries';

describe('fromEntries', () => {
  it('should combine all entries to object', () => {
    expect(fromEntries({}, [pair(['foo'], 123), pair(['bar'], 456)])).toEqual({ foo: 123, bar: 456 });
  });

  it('should combine all entries to array', () => {
    expect(fromEntries([], [pair([0, 'foo'], 123), pair([1, 'bar'], 456)])).toEqual([{ foo: 123 }, { bar: 456 }]);
  });

  it('should respect order of entries', () => {
    expect(fromEntries({}, [pair(['foo'], 123), pair(['foo'], 456)])).toEqual({ foo: 456 });
  });
});
