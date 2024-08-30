// src/immutable.ts
export function immutable<T>(obj: T): T {
  return Object.freeze(obj);
}
