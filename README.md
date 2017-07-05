immutad●t
=================

A JavaScript library to deal with nested immutable structures.

```js
push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4)
// → { nested: { prop: [1, 2, 3, 4] } }

pickBy({ nested: [{ a: 1, b: 2, c: 3, d: 4 }, { e: 6 }] }, 'nested.0', v => v < 3)
// → { nested: [{ a: 1, b: 2 }, { e: 6 }] }
```
immutad●t gives you a short and meaningful syntax to apply operations on immutable structures.

[![CircleCI](https://circleci.com/gh/Zenika/immutadot.svg?style=shield&circle-token=8b309750f5785783ec9fb4531ba097da60563beb)](https://circleci.com/gh/Zenika/immutadot)
[![codecov](https://codecov.io/gh/Zenika/immutadot/branch/master/graph/badge.svg)](https://codecov.io/gh/Zenika/immutadot)
[![npm version](https://badge.fury.io/js/immutadot.svg)](https://badge.fury.io/js/immutadot)

## Immutability

In the last few years one of our biggest challenge has been to find an efficient way to detect changes in our data to determine when to re-render our interfaces.

An immutable object is an object that cannot be changed once created. It brings several benefits<sup>[1](#notes)</sup> :

- Data changes detection made simple (Shallow comparison)
- Memoization
- Improve rendering performances
- Explicit data changes
- Avoid side effects

## Our approach

### Concise

[ES2015+](https://github.com/tc39/ecma262#ecmascript) new features are great to deal with arrays and objects. As data structures get deeper, the code you write to make data immutable gets bigger and less readable. immutad●t uses the dot notation to address this issue.

### Interoperability

Since immutad●t uses plain JavaScript objects you can use all standards ways to access your data. Moreover it lets you use all your favorites libraries.

### Exhaustive and yet extensible

immutad●t comes with a large set of built-in utilities, mostly based on [lodash](https://lodash.com/). You haven't found what you're looking for? Do it yourself with the `convert` feature.

### Learning curve

If you are already familiar with [lodash](https://lodash.com/) and [ES2015+](https://github.com/tc39/ecma262#ecmascript) then you should be able to use immutad●t quickly.

## Notes

- [1](#immutability): You can find more informations about immutability and its benefits in the following article http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/
