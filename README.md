# Memoized Function

This is a simple project that contains a Memoized Function.

It simply uses the built in `Map` as the cache. You can use this to calculate expensive functions, which will save memory.

Here's a small example:

```ts
import { memoizeFunction } from "./memoized.ts";

const memoizedFunction = memoizeFunction((param) => {
	// Some expensive calculations...
	return param + 100000;
});

memoizedFunction(21); // Returns 100021 by calculating it;
memoizedFunction(21); // Returns 100021 without calucating it as it is saved in the cache.
```

You can use this in any of your projects that you want.

There is a **TypeScript** as well as a **JavaScript** version for your convenience.

> Note for TypeScript Users: You will also have to take the types from `./types.ts` file.

Currently, this project is not an NPM Package, but soon it will be.

Thanks for checking it out!
