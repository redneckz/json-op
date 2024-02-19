export const compose =
  <A, B = A, C = B>(fnA: (a: A) => B, fnB: (b: B) => C) =>
  (a: A): C =>
    fnB(fnA(a));
