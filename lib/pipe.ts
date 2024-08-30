// src/pipe.ts
export function pipe(...fns: Function[]) {
  return function (x: any) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}
