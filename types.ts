export type MemoizeFucntion = <T>(func: (param: T) => T) => (params: T) => T;
export type Func<T> = (param: T) => T;
export type Cache<T> = Map<T, T>;
