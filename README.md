# Memoize Function

This is a simple project that contains a function which memoizes the function passed to it.

It simply uses the built in `Map` as the cache. You can use this to calculate expensive functions, which will save memory.

Here's a small example:

```ts
import { memoizeFunction } from "./memoized";

const memoizedFunction = memoizeFunction((param) => {
	// Some expensive calculations...
	return param + 100000;
});

memoizedFunction(21); // Returns 100021 by calculating it;
memoizedFunction(21); // Returns 100021 without calucating it as it is saved in the cache.
```

It also uses `Object.is` under the hood to check the equality of the parameters passed to it.

Example:

```ts
import { memoizeFunction } from "./memoized";

const memoizedFunction = memoizeFunction((param) => {
	return param.foo;
});

memoizedFunction({
	foo: "string",
}); // Returns `string` by calculating it

memoizedFunction({
	foo: "string",
}); // Again returns `string` by calculating it instead of returning the value in the cache.

// To prevent this, create a variable and set it to the value of the parameter you are going to pass to `memoizedFunction`.

const PARAM = {
	foo: "another-string";
}

memoizedFunction(PARAM) // Returns `another-string` by calculating it.

memoizedFunction(PARAM) // Returns `another-string` from the cache.
```

You can use this in any of your projects that you want.

There is a **TypeScript** as well as a **JavaScript** version for your convenience.

> Note for TypeScript Users: You will also have to take the types from `./types.ts` file.

Currently, this project is not an NPM Package, but soon it will be.

Thanks for checking it out!
