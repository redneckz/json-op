export type Unit<Input extends [unknown, ...unknown[]], Output> = (...input: Input) => Output;
