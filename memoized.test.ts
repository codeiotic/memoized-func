import memoizeFunction from "./memoized";

test("Memoized function works", () => {
	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizeFunction<
		number,
		number
	>(mockCallback);

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
	const memoized: (params: number) => number = memoizeFunction<
		number,
		number
	>(mockCallback);

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
		memoizeFunction<jest.Mock<any, any>, jest.Mock<any, any>>(mockCallback);

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
	const memoized: (params: number) => number = memoizeFunction<
		number,
		number
	>(mockCallback);

	const start: number = Date.now();

	for (let i: number = 0; i < 100000; i++) {
		memoized(i);
	}
	const end: number = Date.now();

	expect(end - start).toBeLessThan(100);
});

test("Calling the function multiple times", () => {
	const INITIAL_LIMIT: 1000 = 1000;

	const mockCallback: jest.Mock<number, [x: number]> = jest.fn(
		(x: number) => x + 1
	);
	const memoized: (params: number) => number = memoizeFunction<
		number,
		number
	>(mockCallback);

	for (let i: number = 0; i < INITIAL_LIMIT; i++) {
		memoized(i);
	}

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT);

	memoized(23);
	memoized(24);
	memoized(234);
	memoized(106);
	memoized(146);
	memoized(298);
	memoized(319);
	memoized(425);
	memoized(555);
	memoized(626);
	memoized(734);
	memoized(825);
	memoized(999);

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT);

	memoized(2342);

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT + 1);

	expect(memoized(1324)).toBe(1325);

	expect(mockCallback).toHaveBeenCalledTimes(INITIAL_LIMIT + 2);
});

test("Works with different types", () => {
	const mockCallback: jest.Mock<string, [x: { foo: string }]> = jest.fn(
		({ foo }: { foo: string }) => foo + "bar"
	);

	const memoized: (param: { foo: string }) => string = memoizeFunction<
		{ foo: string },
		string
	>(mockCallback);

	expect(
		memoized({
			foo: "foo",
		})
	).toBe("foobar");

	expect(mockCallback).toBeCalledTimes(1);

	type Params = { foo: string; bar: number; baz: Array<string> };
	type Return = [string, number, Array<string>];

	const INITIAL_VALUE = {
		foo: "foo",
		bar: 1,
		baz: ["a", "b", "c"],
	};

	const mockCallback2: jest.Mock<Return, [x: Params]> = jest.fn(
		({ foo, bar, baz }: Params) => [foo, bar, baz]
	);

	const memoized2: (param: Params) => Return = memoizeFunction<
		Params,
		Return
	>(mockCallback2);

	expect(memoized2(INITIAL_VALUE)).toStrictEqual(["foo", 1, ["a", "b", "c"]]);

	expect(mockCallback2).toBeCalledTimes(1);

	memoized2(INITIAL_VALUE);

	expect(mockCallback2).toBeCalledTimes(1);

	memoized2({
		foo: "Hello!",
		bar: 2,
		baz: ["d", "e"],
	});

	expect(mockCallback2).toBeCalledTimes(2);

	memoized2(INITIAL_VALUE);

	memoized2({
		foo: "Hello!",
		bar: 2,
		baz: ["d", "e"],
	});

	expect(mockCallback2).toBeCalledTimes(3); // Value is incremented as the param passed is not instantiated in a variable
});
