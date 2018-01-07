![immutadot logo](https://raw.githubusercontent.com/Zenika/immutadot/master/misc/otter.svg?sanitize=true)
=================

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
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://zenika.github.io/immutadot/immutadot)

[![CircleCI](https://circleci.com/gh/Zenika/immutadot.svg?style=shield&circle-token=8b309750f5785783ec9fb4531ba097da60563beb)](https://circleci.com/gh/Zenika/immutadot)
[![codecov](https://codecov.io/gh/Zenika/immutadot/branch/master/graph/badge.svg)](https://codecov.io/gh/Zenika/immutadot)
[![Greenkeeper](https://badges.greenkeeper.io/Zenika/immutadot.svg)](https://greenkeeper.io/)

## [1.0 Release Candidate](https://github.com/Zenika/immutadot/releases) is out 🎉

We are still writing the documentation, you can already find out about the [updated API](https://zenika.github.io/immutadot/immutadot/1.0) and our new package [immutadot-lodash](https://zenika.github.io/immutadot/immutadot-lodash/1.0).

If you would like to try out 1.0 before its official release, install it with :

```shell
yarn add immutadot@next
```

or


```shell
npm install immutadot@next
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

immutad●t comes with a large set of built-in utilities, mostly based on [ES2015+](https://mdn.io/JavaScript/Reference). You can also find a package called [immutadot-lodash](https://github.com/Zenika/immutadot/tree/master/packages/immutadot-lodash) with some of [lodash](https://lodash.com/)'s utilities. You haven't found what you're looking for? Do it yourself with the [`convert`](https://zenika.github.io/immutadot/immutadot/1.0/core.html#.convert) feature.

### Learning curve

If you are already familiar with [ES2015+](https://mdn.io/JavaScript/Reference) and [lodash](https://lodash.com/) then you should be able to use immutad●t quickly.

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

ES modules:

```js
import { set } from 'immutadot'
```

CommonJS:  

```js
const { set } = require('immutadot')
```

### Example

Object used in the following example:

```js
const animals = {
  weasels: [
    {
      vernacularName: 'badger',
      scientificName: 'Meles meles'
    },
    {
      vernacularName: 'otter',
    }
  ]
}
```

Let's add the otter's scientific name without mutating the original object structure.

using ES2015+:

```js
const newAnimals = {
  ...animals,
  weasels: [...animals.weasel]
}

newAnimals.weasels[1] = {
  ...newAnimals.weasels[1],
  scientificName: 'Lutrinae'
}
```

using immutad●t:

```js
const newAnimals = set(animals, 'weasels[1].scientificName', 'Lutrinae')
```


Feel free to [try immutad●t on runkit](https://npm.runkit.com/immutadot).

## Path notation

immutad●t brings a few improvements to the classic dot notation:

### Slice notation

The slice notation lets you iterate over arrays to apply operations without having to map arrays at each level of imbrication.

We forgot to capitalize vernacular names in the [input](#Example).

using ES2015+:

```js
import { capitalize } from 'lodash'
const newAnimals = {
  ...animals,
  weasels: animals.weasels.map(weasel => {
    return {
      ...weasel,
      vernacularName: capitalize(weasel.vernacularName),
    }
  }),
}
```

using immutad●t-lodash:

```js
import { capitalize } from 'immutadot-lodash'
const newAnimals = capitalize(animals, 'weasels[:].vernacularName')
```

### List notation

The list notation lets you iterate over the keys of objects used as collection or map to apply operations.

```js
toggle({ nested: { prop: { 1: { active: true }, 2: { active: false } } } }, 'nested.prop.{*}.active')
// { nested: { prop: { 1: { active: false }, 2: { active: true }] } }

toLowerCase({ nested: { prop: { 1: { msg: 'Hello' }, 2: { msg: 'Hi' }, 3: { msg: 'Good morning' } } } }, 'nested.prop{2, 3}.msg')
// { nested: { prop: { 1: { msg: 'Hello' }, 2: { msg: 'hi' }, 3: { msg: 'good morning' } } } }
```

## Performances

We reused a [simple benchmark](https://github.com/Zenika/immutadot/tree/master/packages/immutadot-benchmark/src/benchmark.spec.js) originally made by [mweststrate](https://github.com/mweststrate) for [immer](https://github.com/mweststrate/immer).
It updates 10.000 items out of list of 100.000 todos items, these tests were ran with Node 8.4.0 on an Intel® Core™ i7-6560U CPU @ 2.20GHz:

```shell
Update todos list
  ✓ with mutation (2ms)
  ✓ with deep cloning, then mutation (689ms)
  ✓ with ES2015 destructuring (42ms)
  ✓ with immutable (w/o conversion to plain JS objects) (50ms)
  ✓ with immutable (w/ conversion to plain JS objects) (1011ms)
  ✓ with immer (proxy implementation w/o autofreeze) (259ms)
  ✓ with immutad●t (77ms)
```

When applying operations on a path immutad●t tries to create the minimum of objects or arrays needed to guarantee your data structure to be immutable.

## Documentation

Latest API documentation for our different packages are available here:
- [immutadot](https://zenika.github.io/immutadot/immutadot)
- [immutadot-lodash](https://zenika.github.io/immutadot/immutadot-lodash/)

Looking for older versions API documentation? Links are available [here](https://github.com/Zenika/immutadot/blob/master/docs/README.md).

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
