immutad●t
=================

immutad●t (pronounced immutadot) is a library to deal with nested immutable structures.

[![CircleCI](https://circleci.com/gh/Zenika/immutadot.svg?style=shield&circle-token=8b309750f5785783ec9fb4531ba097da60563beb)](https://circleci.com/gh/Zenika/immutadot)
[![codecov](https://codecov.io/gh/Zenika/immutadot/branch/master/graph/badge.svg)](https://codecov.io/gh/Zenika/immutadot)
[![npm version](https://badge.fury.io/js/immutadot.svg)](https://badge.fury.io/js/immutadot)

**immutad●t** let you use a more friendly and shorter syntax to apply operations on immutable structures.

```js
const newState = {
  ...state
  prop: value
}
```

```js
const newState = set(state, 'prop', value)
```

This example isn't the most relevant. In the next one we want to push a new value in an array located in a nested structure.

```js
const newState = {
  ...state
  nested: {
    ...state.nested,
    prop: [
      ...state.nested.prop,
      value
    ]
  }
}
```

```js
const newState = push(state, 'nested.prop', value)
```

With the dot notation we removed a big amount of code. This is the real strength of **immutad●t**.

## Immutability

In last years one of our biggest challenge was to find a efficient way to detect changes in our data to determine when to re-render our interfaces.

An immutable object is an object that cannot be changed once created. At first it seems pretty restrictive but it has a lot of benefits:

- Simpler change detection (Shallow comparison)
- Memoization
- Improve rendering performances
- Explicit data changes

## Our approach

### Concise

**ES2015 and further versions** new features are great to deal with arrays and objects. As structures grows it becomes verbose to keep them immutable. **immutad●t** provides a concise dot notation to resolve this issue.

### Exhaustive and yet extensible

We embark most of **lodash**'s features. The method you want isn't implemented ? `mixin`function let you extend library's features.

### Learning curve

If you are familiar with **lodash** and **ES2015 and further versions** you won't have to learn much more to use **immutad●t** efficiently.
