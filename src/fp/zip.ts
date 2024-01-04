export const zip = <A, B>(a: A[], b: B[]): [A, B][] =>
  Array.from({ length: Math.max(a.length, b.length) }, (_, i) => [a[i], b[i]]);
