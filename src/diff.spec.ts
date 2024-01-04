/* eslint-disable @typescript-eslint/no-explicit-any */
import { diff } from './diff';
import { pair } from './fp/tuple';
import { fromAncestors } from './JSONDiscriminator';
import { isJSONArray, isJSONRecord, type JSONNode } from './JSONNode';

describe('diff', () => {
  it('should return an empty list if there is no difference', () => {
    const original = { a: 1, b: 2 };
    const modified = original;
    expect(diff(original, modified)).toEqual([]);
  });

  it('should return list of entries of distinct fields', () => {
    const original = { a: 1, b: 2 };
    const modified = { a: 1, b: 3 };
    expect(diff(original, modified)).toEqual([pair(['b'], 3)]);
  });

  it('should compute difference regardless of depth', () => {
    const original = { a: { x: 1, y: 2 } };
    const modified = { a: { x: 1, y: 3 } };
    expect(diff(original, modified)).toEqual([pair(['a', 'y'], 3)]);
  });

  it('should compute difference for arrays as well', () => {
    const original = { a: [1, 2, 3] };
    const modified = { a: [1, 5, 3] };
    expect(diff(original, modified)).toEqual([pair(['a', 1], 5)]);
  });

  it('should respect custom discriminator', () => {
    const id = (node: JSONNode | undefined): string | undefined =>
      isJSONRecord(node) && 'id' in node ? (node.id as string) : undefined;
    const byId = (a: JSONNode) => (b: JSONNode) => id(a) === id(b);

    const discriminator = fromAncestors(([path, result], [p, ancestor]) =>
      isJSONArray(result) && isJSONArray(ancestor) && typeof p === 'number' && id(ancestor[p])
        ? [[...path, result.findIndex(byId(ancestor[p]))], result.find(byId(ancestor[p]))]
        : [[...path, p], (result as any)?.[p]]
    );

    expect(
      diff(
        {
          a: [
            { id: '123', foo: 123 },
            { id: '456', bar: 456 }
          ]
        },
        {
          a: [
            { id: '456', bar: 456 },
            { id: '123', foo: 456 }
          ]
        },
        discriminator
      )
    ).toEqual([pair(['a', 1, 'foo'], 456)]);
  });
});
