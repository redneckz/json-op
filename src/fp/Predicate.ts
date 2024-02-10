import { Unit } from './Unit';

export type Predicate<Input extends [unknown, ...unknown[]]> = Unit<Input, boolean>;

export const trueF = (): true => true;
export const falseF = (): false => false;

export const and =
  <Args extends [unknown, ...unknown[]]>(a: Predicate<Args>, b: Predicate<Args>): Predicate<Args> =>
  (...args) =>
    a(...args) && b(...args);

export const or =
  <Args extends [unknown, ...unknown[]]>(a: Predicate<Args>, b: Predicate<Args>): Predicate<Args> =>
  (...args) =>
    a(...args) || b(...args);

export const not =
  <Args extends unknown[]>(_: (...args: Args) => boolean) =>
  (...args: Args) =>
    !_(...args);
