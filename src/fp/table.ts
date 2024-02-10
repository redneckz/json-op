import { trueF, type Predicate } from './Predicate';
import { type Unit } from './Unit';

type TableEntry<Input extends [unknown, ...unknown[]], Output> = [Predicate<Input>, Unit<Input, Output>];

export const table =
  <Input extends [unknown, ...unknown[]], Output>(
    ...table: [...TableEntry<Input, Output>[], [typeof trueF, Unit<Input, Output>]]
  ): Unit<Input, Output> =>
  (...input) => {
    const [, unit] = assertNonEmpty(table.find(([predicate]) => predicate(...input)));
    return unit(...input);
  };

function assertNonEmpty<T>(value: T | undefined): T {
  if (!value) {
    throw new Error('Value should be fulfilled');
  }

  return value;
}
