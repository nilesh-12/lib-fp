// src/pipe.ts
export function pipe(...fns: Function[]) {
  return function (x: any) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}
// src/pipe.ts
export function pipeAsync(...fns: Function[]) {
  return async function (x: any) {
    return fns.reduce(async (accPromise, fn) => {
      const acc = await accPromise;
      return fn(acc);
    }, Promise.resolve(x));
  };
}
