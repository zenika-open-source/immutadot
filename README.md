![immutadot logo](https://raw.githubusercontent.com/Zenika/immutadot/master/misc/otter.svg?sanitize=true)
===

A JavaScript library to deal with nested immutable structures.

```js
set({ english: { greeting: 'Hi' } }, 'english.greeting', 'Hello')
// → { english: { greeting: 'Hello' } }

push({ i18n: { languages: ['English', 'French'] } }, 'i18n.languages', 'German', 'Spanish')
// → { i18n: { languages: ['English', 'French', 'German', 'Spanish'] } }
```
immutad●t gives you a short and meaningful syntax to apply operations on immutable structures.

[![npm version](https://badge.fury.io/js/immutadot.svg)](https://badge.fury.io/js/immutadot)
[![Try on RunKit](https://badge.runkitcdn.com/immutadot.svg)](https://npm.runkit.com/immutadot)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://zenika.github.io/immutadot/api/immutadot)

[![CircleCI](https://circleci.com/gh/Zenika/immutadot.svg?style=shield&circle-token=8b309750f5785783ec9fb4531ba097da60563beb)](https://circleci.com/gh/Zenika/immutadot)
[![codecov](https://codecov.io/gh/Zenika/immutadot/branch/master/graph/badge.svg)](https://codecov.io/gh/Zenika/immutadot)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/immutadot/badge)](https://www.jsdelivr.com/package/npm/immutadot)

## [2.0](https://github.com/Zenika/immutadot/milestone/12) is under development :building_construction:

We are working right now on the second major version of immutad●t ! :construction_worker_woman::construction_worker_man:

One of our main goals is to bring a major performance improvement :zap:, but also some new features :
 - [Negative array indexes](https://github.com/Zenika/immutadot/issues/169) (already supported in slices)
 - [Step in slice notation](https://github.com/Zenika/immutadot/issues/295)
 - [Optional chaining](https://github.com/Zenika/immutadot/issues/116)

Feel free to add feature requests or to join us !

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

You can also directly download [sources](https://github.com/Zenika/immutadot/releases) or use bundles available on [jsDelivr](https://www.jsdelivr.com/package/npm/immutadot).

## Usage

ES modules:

```js
import { set } from 'immutadot'
```

CommonJS:  

```js
const { set } = require('immutadot')
```

### Example

Quickly set nested properties using [set()](https://zenika.github.io/immutadot/api/immutadot/1.0/core.html#.set)

```js
import { set } from 'immutadot'

const animals = {
  weasels: {
    lutraLutra: {
      commonNames: ['eurasian otter'],
    },
  },
}

const newAnimals = set(animals, 'weasels.lutraLutra.name', 'Lutrinae')
```

Learn more about what immutad●t can do in the [Getting started](https://github.com/Zenika/immutadot/blob/master/docs/GETTING_STARTED.md).

Feel free to [try immutad●t on runkit](https://npm.runkit.com/immutadot).

## Documentation

### Getting started

A fast overview of immutad●t's features is available in the [Getting started](https://github.com/Zenika/immutadot/blob/master/docs/GETTING_STARTED.md) guide.

### API

The detailed API documentations of the different packages are available here:
- [immutadot](https://zenika.github.io/immutadot/api/immutadot)
- [immutadot-lodash](https://zenika.github.io/immutadot/api/immutadot-lodash/)

Looking for older versions API documentation? Links are available [here](https://github.com/Zenika/immutadot/blob/master/docs/README.md).

### Migrating from 0.x versions

If you were using a version of immutad●t previous to 1.0, check out the [migrating guide](docs/MIGRATING_TO_1_0.md).

## Performances

A [simple benchmark](https://github.com/Zenika/immutadot/tree/master/packages/immutadot-benchmark/src/updateTodos.spec.js) (freely inspired from one made by [mweststrate](https://github.com/mweststrate) for [immer](https://github.com/mweststrate/immer)) reveals that immutad●t shows good results compared to other libraries.

:warning: The following results should be taken with caution, they may vary depending on the hardware, the JavaScript engine, and the kind of operations performed. This particular test updates 10% out of a list of todos items, and was ran with Node 9.8.0 on an Intel® Core™ i7-6560U CPU @ 2.20GHz.

```
Update small todos list (1000 items):
  ES2015 destructuring: ~17775ops/s (0.06ms/op) on 50000ops
  immutable 3.8.2 (w/o conversion to plain JS objects): ~6737ops/s (0.15ms/op) on 50000ops
  immutable 3.8.2 (w/ conversion to plain JS objects): ~109ops/s (9.17ms/op) on 3274ops
  immer 1.2.0 (proxy implementation w/o autofreeze): ~1132ops/s (0.88ms/op) on 34025ops
  immer 1.2.0 (ES5 implementation w/o autofreeze): ~521ops/s (1.92ms/op) on 15680ops
  qim 0.0.52: ~12042ops/s (0.08ms/op) on 50000ops
  immutad●t 1.0.0: ~2351ops/s (0.43ms/op) on 50000ops
Update medium todos list (10000 items):
  ES2015 destructuring: ~1801ops/s (0.56ms/op) on 5000ops
  immutable 3.8.2 (w/o conversion to plain JS objects): ~630ops/s (1.59ms/op) on 5000ops
  immutable 3.8.2 (w/ conversion to plain JS objects): ~10ops/s (95.70ms/op) on 314ops
  immer 1.2.0 (proxy implementation w/o autofreeze): ~111ops/s (9.04ms/op) on 3319ops
  immer 1.2.0 (ES5 implementation w/o autofreeze): ~51ops/s (19.76ms/op) on 1519ops
  qim 0.0.52: ~1257ops/s (0.80ms/op) on 5000ops
  immutad●t 1.0.0: ~234ops/s (4.28ms/op) on 5000ops
Update large todos list (100000 items):
  ES2015 destructuring: ~120ops/s (8.34ms/op) on 500ops
  immutable 3.8.2 (w/o conversion to plain JS objects): ~58ops/s (17.28ms/op) on 500ops
  immutable 3.8.2 (w/ conversion to plain JS objects): ~1ops/s (998.81ms/op) on 31ops
  immer 1.2.0 (proxy implementation w/o autofreeze): ~21ops/s (48.68ms/op) on 500ops
  immer 1.2.0 (ES5 implementation w/o autofreeze): ~4ops/s (264.16ms/op) on 114ops
  qim 0.0.52: ~91ops/s (11.01ms/op) on 500ops
  immutad●t 1.0.0: ~21ops/s (48.22ms/op) on 500ops
```

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

[ES2015+](https://mdn.io/JavaScript/Reference) new features are great to deal with arrays and objects. As data structures expand, the code you write to make data immutable gets bigger and less readable. immutad●t uses the dot notation to address this issue.

### Interoperability

immutad●t uses plain JavaScript objects so you can access your data using standard ways. Moreover, it lets you freely enjoy your favorite libraries.

### Exhaustive and yet extensible

immutad●t comes with a large set of built-in utilities, mostly based on [ES2015+](https://mdn.io/JavaScript/Reference). You can also find a package called [immutadot-lodash](https://github.com/Zenika/immutadot/tree/master/packages/immutadot-lodash) with some of [lodash](https://lodash.com/)'s utilities. You haven't found what you're looking for? Do it yourself with the [`convert`](https://zenika.github.io/immutadot/api/immutadot/1.0/core.html#.convert) feature.

### Learning curve

If you are already familiar with [ES2015+](https://mdn.io/JavaScript/Reference) and [lodash](https://lodash.com/) then you should be able to use immutad●t quickly.

## Contributing

We want contributing to immutad●t to be fun, enjoyable, and educational for anyone, and everyone.

### [Code of Conduct](https://github.com/Zenika/immutadot/blob/master/.github/CODE_OF_CONDUCT.md)

In the interest of fostering an open and welcoming environment, we have adopted a Code of Conduct that we expect project participants to commit to. Please read the [full text](https://github.com/Zenika/immutadot/blob/master/.github/CODE_OF_CONDUCT.md) so that you can understand what behavior will and will not be tolerated.

### [Contributing guide](https://github.com/Zenika/immutadot/blob/master/.github/CONTRIBUTING.md)

If you are interested in contributing to immutad●t, please read our [contributing guide](https://github.com/Zenika/immutadot/blob/master/.github/CONTRIBUTING.md) to learn more about how to suggest bugfixes and improvements.

## License

immutad●t is [MIT licensed](https://github.com/Zenika/immutadot/blob/master/LICENSE.md).

## Notes

- [1](#immutability): You can find more information about immutability and its benefits in the following article http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/
