import { Predicate, and, trueF } from './fp/Predicate';

export type JSONPathElement = string | number;
export type JSONPath = JSONPathElement[];

export const ROOT: JSONPath = [];
export const isRoot = (_: JSONPath): _ is [] => !_?.length;
export const isNotRoot = (
  _: JSONPath
): _ is [JSONPathElement, ...JSONPathElement[]] | [...JSONPathElement[], JSONPathElement] => Boolean(_?.length);

export const equals =
  (a: JSONPath) =>
  (b: JSONPath): boolean =>
    a.length === b.length && a.every((ai, i) => ai === b[i]);

export const startsWith = (prefix: Array<JSONPathElement | Predicate<[JSONPathElement]>>) =>
  prefix.map((predicate, i) => (path: JSONPath) => cmp(predicate)(path[i])).reduceRight(and, trueF);

export const endsWith = (suffix: Array<JSONPathElement | Predicate<[JSONPathElement]>>) =>
  suffix
    .map((predicate, i) => (path: JSONPath) => cmp(predicate)(path[i + path.length - suffix.length]))
    .reduceRight(and, trueF);

const cmp = (a: JSONPathElement | Predicate<[JSONPathElement]>) =>
  a instanceof Function ? a : (b: JSONPathElement) => a === b;
