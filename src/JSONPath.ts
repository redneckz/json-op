export type JSONPathElement = string | number;
export type JSONPath = JSONPathElement[];

export const ROOT: JSONPath = [];
export const isRoot = (_: JSONPath): _ is [] => !_?.length;
