immutad●t
=================

A JavaScript library to deal with nested immutable structures.

```js
push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4)
// → { nested: { prop: [1, 2, 3, 4] } }

pickBy({ nested: [{ a: 1, b: 2, c: 3, d: 4 }, { e: 6 }] }, 'nested.0', v => v < 3)
// → { nested: [{ a: 1, b: 2 }, { e: 6 }] }
```
immutad●t lets you use a more meaningful and shorter syntax to apply operations on immutable structures.

[![CircleCI](https://circleci.com/gh/Zenika/immutadot.svg?style=shield&circle-token=8b309750f5785783ec9fb4531ba097da60563beb)](https://circleci.com/gh/Zenika/immutadot)
[![codecov](https://codecov.io/gh/Zenika/immutadot/branch/master/graph/badge.svg)](https://codecov.io/gh/Zenika/immutadot)
[![npm version](https://badge.fury.io/js/immutadot.svg)](https://badge.fury.io/js/immutadot)

## Immutability

In the last years one of our biggest challenge has been to find an efficient way to detect changes in our data to determine when to re-render our interfaces.

An immutable object is an object that cannot be changed once created. It brings several benefits :

- Simpler change detection (Shallow comparison)
- Memoization
- Improve rendering performances
- Explicit data changes
- Remove side effects

## Our approach

### Concise

*ES2015 and further versions* new features are great to deal with arrays and objects. As structures grow it becomes verbose to keep them immutable. immutad●t uses the dot notation to address this issue.

### Exhaustive and yet extensible

immutad●t comes with a large set of built-in utilities, mostly based on *lodash*. You haven't found what you want ? Create it yourself with the `convert` feature.

### Learning curve

If you are familiar with *lodash* and *ES2015 and further versions* you won't have to learn much more to use immutad●t efficiently.
