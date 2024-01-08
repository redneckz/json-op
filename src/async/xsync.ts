type O<I, Input, Output> = I extends Promise<Input> ? Promise<Output> : Output;

export const xsync =
  <In, Rest extends unknown[], Out>(fn: (input: In, ...rest: Rest) => Out | Promise<Out>) =>
  <I extends In | Promise<In> = In>(input: I, ...rest: Rest): O<I, In, Out> =>
    (input instanceof Promise ? input.then(_ => fn(_, ...rest)) : fn(input as In, ...rest)) as O<I, In, Out>;

export const fulfilled = async <T>(list: Array<Promise<T> | T>): Promise<T[]> =>
  (await Promise.allSettled(list))
    .filter((_): _ is PromiseFulfilledResult<Awaited<T>> => _.status === 'fulfilled')
    .map(_ => _.value);
