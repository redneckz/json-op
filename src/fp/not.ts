export const not =
  <Args extends unknown[]>(_: (...args: Args) => boolean) =>
  (...args: Args) =>
    !_(...args);
