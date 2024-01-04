export type JSONPathElement = string | number;
export type JSONPath = JSONPathElement[];

export const ROOT: JSONPath = [];
export const isRoot = (_: JSONPath): _ is [] => !_?.length;

export const cmp = (a: JSONPath, b: JSONPath): boolean => a.length === b.length && a.every((ai, i) => ai === b[i]);
