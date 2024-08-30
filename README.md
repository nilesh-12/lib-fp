# LibFP

A library providing functional programming utilities for better code maintainability.

## Installation

```bash
npm install lib-fp
```

## Usage

```typescript
import { curry, pipe, compose, immutable } from 'lib-fp';

const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)); // 3

const double = (x: number) => x * 2;
const increment = (x: number) => x + 1;
const result = pipe(double, increment)(3);
console.log(result); // 7

const greet = (name: string) => `Hello, ${name}!`;
const exclaim = (message: string) => `${message}!!`;
const excitedGreet = compose(exclaim, greet);
console.log(excitedGreet('Alice')); // Hello, Alice!!!! 

const obj = { name: 'Alice' };
const immutableObj = immutable(obj);
```
