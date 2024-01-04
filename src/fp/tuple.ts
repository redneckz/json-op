export const pair = <A, B>(a: A, b: B): [A, B] => [a, b];

export const t0 =
  <T extends unknown[], R>(fn: (_: T[0]) => R) =>
  ([_]: T) =>
    fn(_);

export const t1 =
  <T extends unknown[], R>(fn: (_: T[1]) => R) =>
  ([, _]: T) =>
    fn(_);
