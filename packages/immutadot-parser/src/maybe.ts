export type Maybe<T> = T | null;

export const map = <T, R> (maybe: Maybe<T>, fn: (v: T) => R): Maybe<R> => maybe === null ? null : fn(maybe);

export const Maybe = {
  map,
};
