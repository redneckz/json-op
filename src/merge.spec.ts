/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromAncestors } from './JSONDiscriminator';
import { isJSONArray, isJSONRecord, type JSONRecord, type JSONNode } from './JSONNode';
import { merge } from './merge';
import { diff } from './diff';
import { fromEntries } from './fromEntries';

describe('merge', () => {
  it('should override fields', () => {
    expect(merge({ foo: 123 }, { foo: 456 })).toEqual({ foo: 456 });
  });

  it('should append new fields', () => {
    expect(merge({ foo: 123 }, { bar: 456 })).toEqual({ foo: 123, bar: 456 });
  });

  it('should merge arrays as well', () => {
    expect(merge([{ foo: 123 }, { foo: 456 }], [{ bar: 123 }, { bar: 456 }, {}])).toEqual([
      { foo: 123, bar: 123 },
      { foo: 456, bar: 456 },
      {}
    ]);
  });

  describe('with custom discriminator', () => {
    const id = (node: JSONNode | undefined): string | undefined =>
      isJSONRecord(node) && 'id' in node ? (node.id as string) : undefined;
    const byId = (a: JSONNode) => (b: JSONNode) => id(a) === id(b);

    const discriminator = fromAncestors(([path, result], [p, ancestor]) =>
      isJSONArray(result) && isJSONArray(ancestor) && typeof p === 'number' && id(ancestor[p])
        ? [[...path, result.findIndex(byId(ancestor[p]))], result.find(byId(ancestor[p]))]
        : [[...path, p], (result as any)?.[p]]
    );

    it('should respect custom discriminator', () => {
      expect(
        merge(
          {
            a: [
              { id: '123', foo: 123 },
              { id: '456', baz: 123 }
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
      ).toEqual({
        a: [
          { id: '123', foo: 456 },
          { id: '456', baz: 123, bar: 456 }
        ]
      });
    });

    it('should work as inverse function of "diff"', () => {
      const source: JSONRecord = {
        a: [
          { id: '123', foo: [1, 2, 3] },
          { id: '456', baz: 123 }
        ]
      };
      const target: JSONRecord = {
        a: [
          { id: '123', foo: [1, 0, 3] },
          { id: '456', baz: 123, bar: 456 }
        ]
      };

      const delta = fromEntries(diff(source, target, discriminator), {});

      expect(merge(source, delta, discriminator)).toEqual(target);
    });
  });
});
