import { MemoizeFucntion, Func, Cache } from "./types";

const memoizeFunction: MemoizeFucntion = <T>(func: Func<T>) => {
	const cache: Cache<T> = new Map();

	return (param: T) => {
		if (cache.has(param)) {
			return cache.get(param);
		}
		const result: T = func(param);
		cache.set(param, result);
		return result;
	};
};

export default memoizeFunction;
