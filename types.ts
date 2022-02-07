/**
 * The type of `memoizeFunction`
 * @param P The type of the parameter of the function.
 * @param R The type of the return value of the function.
 */
export type MemoizeFunction = <P, R>(func: Func<P, R>) => Func<P, R>;

/**
 * The type of the function passed to `memoizeFunction`
 * @param P The type of the parameter of the function.
 * @param R The type of the return value of the function.
 */
export type Func<P, R> = (param: P) => R;

/**
 * The cache of `memoizeFunction`
 * @param P The type of key of the cache.
 * @param R The type of value of the cache.
 */
export type Cache<P, R> = Map<P, R>;
