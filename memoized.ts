const memoizedFunction: <T>(func: (param: T) => T) => (params: T) => T = <T>(
	func: (param: T) => T
) => {
	const cache: Map<T, T> = new Map<T, T>();

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
