import { xsync } from './xsync';

const assertType =
  (requirement: string) =>
  <T>(_: () => T): (() => T) => (requirement.length, _);

describe('xsync HOF', () => {
  const square = (_: number) => _ ** 2;

  assertType('of wrapper function returned by HOF')<(_: number | Promise<number>) => number | Promise<number>>(
    () => xsync(square)
  );
  assertType('of wrapper function with extra args')<
    (_: number | Promise<number>, s: string, b: boolean) => string | Promise<string>
  >(() => xsync((_: number, s: string, b: boolean) => `${_}${s}${b}`));

  assertType('of sync call of wrapper function')<number>(() => xsync(square)(123));
  assertType('of async call of wrapper function')<Promise<number>>(() => xsync(square)(Promise.resolve(123)));

  it('should return warpper function', () => {
    expect(xsync(square)).toBeInstanceOf(Function);
  });

  it('should return sync output if sync input is provided', () => {
    const xsquare = xsync(square);
    const result = xsquare(2);

    expect(result).toBe(4);
  });

  it('should return async output if async input is provided', async () => {
    expect.assertions(2);

    const xsquare = xsync(square);
    const result = xsquare(Promise.resolve(2));

    expect(result).toBeInstanceOf(Promise);
    expect(await result).toBe(4);
  });
});
