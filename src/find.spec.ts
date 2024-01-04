import { type JSONEntry } from './JSONEntry';
import { isJSONRecord } from './JSONNode';
import { find } from './find';

const byId =
  (id: string) =>
  ([, node]: JSONEntry) =>
    isJSONRecord(node) && 'id' in node && node.id === id;

describe('find', () => {
  it('should find entry by predicate', () => {
    expect(find(byId('123'))({ foo: { id: '123' }, bar: { id: '456' } })).toEqual([['foo'], { id: '123' }]);
  });
});
