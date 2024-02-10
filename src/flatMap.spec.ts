import { type JSONEntry } from './JSONEntry';
import { isNumber } from './JSONNode';
import { type JSONPathElement } from './JSONPath';
import { flatMap } from './flatMap';
import { init } from './fp/init';
import { last } from './fp/last';

describe('flatMap', () => {
  const doubleNumbers = ([path, n]: JSONEntry): JSONEntry[] => [[path, typeof n === 'number' ? 2 * n : n]];

  it('should map scalars by means of mapper function', () => {
    expect(flatMap(doubleNumbers, 0)(123)).toEqual(2 * 123);
  });

  it('should map arrays by means of mapper function', () => {
    expect(flatMap(doubleNumbers, [])([123, 456])).toEqual([2 * 123, 2 * 456]);
  });

  it('should map object values by means of mapper function', () => {
    expect(flatMap(doubleNumbers)({ foo: 123, bar: 456 })).toEqual({ foo: 2 * 123, bar: 2 * 456 });
  });

  it('should provide the way to inject additional entries', () => {
    const injectFieldType = ([path, _]: JSONEntry): JSONEntry[] => [
      [path, _],
      [[...init(path), `${last(path as [JSONPathElement])}Type`], typeof _]
    ];
    expect(flatMap(injectFieldType)({ foo: 123, bar: '456' })).toEqual({
      foo: 123,
      fooType: 'number',
      bar: '456',
      barType: 'string'
    });
  });

  it('should provide the way to remove specific entries', () => {
    const removeNumbers = (entry: JSONEntry): JSONEntry[] => (isNumber(entry[1]) ? [] : [entry]);
    expect(flatMap(removeNumbers)({ foo: 123, bar: '456' })).toEqual({ bar: '456' });
  });
});
