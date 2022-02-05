import memoizedFunction from "./memoized";

test("Memoized function works", () => {
	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizedFunction(mockCallback);

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
	const memoized: (params: number) => number = memoizedFunction(mockCallback);

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
		memoizedFunction(mockCallback);

	let result: jest.Mock<any, any> = memoized(jest.fn());

	expect(result).toBe(returnCallback);
	expect(mockCallback).toHaveBeenCalledTimes(1);

	result();
	expect(returnCallback).toHaveBeenCalledTimes(1);
});
