export type JSONPathElement = string | number;
export type JSONPath = JSONPathElement[];

export const ROOT: JSONPath = [];
export const isRoot = (_: JSONPath): _ is [] => !_?.length;

export const equals =
  (a: JSONPath) =>
  (b: JSONPath): boolean =>
    a.length === b.length && a.every((ai, i) => ai === b[i]);

export const startsWith =
  (prefix: JSONPath) =>
  (path: JSONPath): boolean =>
    prefix.length <= path.length && prefix.every((pi, i) => pi === path[i]);

export const endsWith =
  (suffix: JSONPath) =>
  (path: JSONPath): boolean =>
    startsWith(suffix.toReversed())(path.toReversed());
