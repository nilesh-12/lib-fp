// src/compose.ts
export function compose(...fns: Function[]) {
  return function (x: any) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}
