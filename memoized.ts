import { MemoizeFunction, Func, Cache } from "./types";

/**
 * Memoizes the function passed in.
 * Use this function to memoize **expensive functions**.
 * ---
 * Here's an example using **JavaScript**:
 * ```ts
 * const memoized = memoizeFunction((a) => a * 100000);
 * memoized(2); // returns 2000000 by calculating it.
 * memoized(2); // returns 2000000 by returning the cached value.
 * ```
 * ---
 * Here's an example using **TypeScript**:
 * ```ts
 * const memoized = memoizeFunction<number, number>((a) => a * 100000);
 * // The first generic argument is the type of the parameter of your function.
 * // The second generic argument is the type of the return value of your function.
 * memoized(2); // returns 2000000 by calculating it.
 * memoized(2); // returns 2000000 by returning the cached value.
 * ```
 * ---
 * @param func The function which you want to memoize.
 * @returns The memoized function.
 */
const memoizeFunction: MemoizeFunction = <P, R>(func: Func<P, R>) => {
	const cache: Cache<P, R> = new Map();

	return (param: P) => {
		if (cache.has(param)) return cache.get(param);
		return cache.set(param, func(param)).get(param);
	};
};

export default memoizeFunction;
