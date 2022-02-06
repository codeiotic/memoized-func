import memoizeFunction from "./memoized";

test("Memoized function works", () => {
	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizeFunction(mockCallback);

	expect(memoized).toBeInstanceOf(Function);
	expect(memoized(1)).toBe(2);
	expect(mockCallback).toHaveBeenCalledTimes(1);

	expect(memoized(1)).toBe(2);
	expect(mockCallback).toHaveBeenCalledTimes(1);
});

test("Memoized works with different arguments", () => {
	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizeFunction(mockCallback);

	expect(memoized(1)).toBe(2);
	expect(mockCallback).toHaveBeenCalledTimes(1);

	expect(memoized(1)).toBe(2);
	expect(mockCallback).toHaveBeenCalledTimes(1);

	expect(memoized(2)).toBe(3);
	expect(mockCallback).toHaveBeenCalledTimes(2);

	expect(memoized(2)).toBe(3);
	expect(mockCallback).toHaveBeenCalledTimes(2);
});

test("Nested Functions", () => {
	/**
	 * The basic idea of this test is to pass a nested function to the memoized function.
	 * The nested function is a function that returns a function.
	 * The function passed to the `memoizedFunction` is saved in the map and memoized.
	 * If the same function is passed to the `memoizedFunction` again, it should return the same function without calling it.
	 */

	const returnCallback: jest.Mock<any, any> = jest.fn();

	const mockCallback: jest.Mock<jest.Mock<any, any>, []> = jest.fn(() => {
		return returnCallback;
	});

	const memoized: (params: jest.Mock<any, any>) => jest.Mock<any, any> =
		memoizeFunction(mockCallback);

	let result: jest.Mock<any, any> = memoized(jest.fn());

	expect(result).toBe(returnCallback);
	expect(mockCallback).toHaveBeenCalledTimes(1);

	result();
	expect(returnCallback).toHaveBeenCalledTimes(1);
});

test("Performance tests", () => {
	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizeFunction(mockCallback);

	const start: number = Date.now();

	for (let i: number = 0; i < 100000; i++) {
		memoized(i);
	}
	const end: number = Date.now();

	expect(end - start).toBeLessThan(100);
});

test("Passing heavy number of functions", () => {
	const INITIAL_LIMIT: 1000 = 1000;

	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizeFunction(mockCallback);

	for (let i: number = 0; i < INITIAL_LIMIT; i++) {
		memoized(i);
	}

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT);

	memoized(23);
	memoized(24);
	memoized(234);
	memoized(106);

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT);

	memoized(2342);

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT + 1);
});
