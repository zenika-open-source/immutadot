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

[![npm version](https://badge.fury.io/js/immutadot.svg)](https://badge.fury.io/js/immutadot)
[![Try on RunKit](https://badge.runkitcdn.com/immutadot.svg)](https://npm.runkit.com/immutadot)
[![](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://zenika.github.io/immutadot)

[![CircleCI](https://circleci.com/gh/Zenika/immutadot.svg?style=shield&circle-token=8b309750f5785783ec9fb4531ba097da60563beb)](https://circleci.com/gh/Zenika/immutadot)
[![codecov](https://codecov.io/gh/Zenika/immutadot/branch/master/graph/badge.svg)](https://codecov.io/gh/Zenika/immutadot)
[![Greenkeeper](https://badges.greenkeeper.io/Zenika/immutadot.svg)](https://greenkeeper.io/)

## Immutability

In the last few years one of our biggest challenge has been to find an efficient way to detect changes in our data to determine when to re-render our interfaces.

An immutable object is an object that cannot be changed once created. It brings several benefits<sup>[1](#notes)</sup>:

- Data changes detection made simple (Shallow comparison)
- Memoization
- Improve rendering performances
- Explicit data changes
- Avoid side effects

## Our approach

### Concise

[ES2015+](https://github.com/tc39/ecma262#ecmascript) new features are great to deal with arrays and objects. As data structures expand, the code you write to make data immutable gets bigger and less readable. immutad●t uses the dot notation to address this issue.

### Interoperability

immutad●t uses plain JavaScript objects so you can access your data using standard ways. Moreover, it lets you freely enjoy your favorite libraries.

### Exhaustive and yet extensible

immutad●t comes with a large set of built-in utilities, mostly based on [lodash](https://lodash.com/). You haven't found what you're looking for? Do it yourself with the `convert` feature.

### Learning curve

If you are already familiar with [lodash](https://lodash.com/) and [ES2015+](https://github.com/tc39/ecma262#ecmascript) then you should be able to use immutad●t quickly.

## Installation

immutad●t is available on [npm repository](https://www.npmjs.com/package/immutadot).

using yarn:

```shell
$ yarn add immutadot
```

using npm:

```shell
$ npm install immutadot
```

or you can directly download [sources](https://github.com/Zenika/immutadot/releases).

## Usage

in browser:

```js
  import { push } from 'immutadot'

  push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4)
  // → { nested: { prop: [1, 2, 3, 4] } }
```

in node:

```js
  const { push } = require('immutadot')

  push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4)
  // → { nested: { prop: [1, 2, 3, 4] } }
```

Feel free to [try immutad●t on runkit](https://npm.runkit.com/immutadot).

## Documentation

The full list of immutad●t's features is available in our [documentation](https://zenika.github.io/immutadot).

## Contributing

We want contributing to immutad●t to be fun, enjoyable, and educational for anyone, and everyone.

### [Code of Conduct](https://github.com/Zenika/immutadot/blob/master/.github/CODE_OF_CONDUCT.md)

In the interest of fostering an open and welcoming environment, we have adopted a Code of Conduct that we expect project participants to commit to. Please read the [full text](https://github.com/Zenika/immutadot/blob/master/.github/CODE_OF_CONDUCT.md) so that you can understand what behavior will and will not be tolerated.

### [Contributing guide](https://github.com/Zenika/immutadot/blob/master/.github/CONTRIBUTING.md)

If you are interested in contributing to immutad●t, please read our [contributing guide](https://github.com/Zenika/immutadot/blob/master/.github/CONTRIBUTING.md) to learn more about how to suggest bugfixes and improvements.

## License

immutad●t is [MIT licensed](https://github.com/Zenika/immutadot/blob/master/LICENSE.md).

## Notes

- [1](#immutability): You can find more informations about immutability and its benefits in the following article http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/
