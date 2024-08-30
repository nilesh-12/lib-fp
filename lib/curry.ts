// src/curry.ts
export function curry(fn: Function) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs: any[]) => curried(...args, ...moreArgs);
    }
  };
}
