export const fulfilled = async <T>(list: Array<Promise<T> | T>): Promise<T[]> =>
  (await Promise.allSettled(list))
    .filter((_): _ is PromiseFulfilledResult<Awaited<T>> => _.status === 'fulfilled')
    .map(_ => _.value);
