export type MemoizeFunction = <T, R>(func: (param: T) => R) => (params: T) => R;
export type Func<P, R> = (param: P) => R;
export type Cache<P, R> = Map<P, R>;
