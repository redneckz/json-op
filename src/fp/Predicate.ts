import { Unit } from './Unit';

export type Predicate<Input extends [unknown, ...unknown[]]> = Unit<Input, boolean>;
