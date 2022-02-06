import { MemoizedFucntion, Func, Cache } from "./types";

const memoizedFunction: MemoizedFucntion = <T>(func: Func<T>) => {
	const cache: Cache<T> = new Map<T, T>();

	return (param: T) => {
		if (cache.has(param)) {
			return cache.get(param);
		}
		const result: T = func(param);
		cache.set(param, result);
		return result;
	};
};

export default memoizedFunction;
