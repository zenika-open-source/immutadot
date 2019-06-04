![immutadot logo](https://raw.githubusercontent.com/zenika-open-source/immutadot/master/misc/otter.svg?sanitize=true)
===

## immutad●t-lodash
immutadot-lodash is an extension to immutad●t, adding functions based on [lodash](https://lodash.com/).

More information on immutad●t is available on the [repository's main page](https://github.com/zenika-open-source/immutadot).

## Installation

immutad●t-lodash is available on [npm repository](https://www.npmjs.com/package/immutadot-lodash).

using yarn:

```shell
$ yarn add immutadot lodash immutadot-lodash
```

using npm:

```shell
$ npm install immutadot lodash immutadot-lodash
```

## Usage

ES modules:

```js
import { mapValues } from 'immutadot-lodash'
```

CommonJS:  

```js
const { mapValues } = require('immutadot-lodash')
```

## Example

Use lodash's `mapValues` on a nested object:

```js
const obj = {
  nested: {
    object: {
      a: 1,
      b: 2,
      c: 3,
    },
  },
}

const newObj = mapValues(obj, 'nested.object', v => v * v)
// =>
// {
//   nested: {
//     object: {
//       a: 1,
//       b: 4,
//       c: 9,
//     },
//   },
// }
```

## Documentation

Latest API documentation is available [here](https://zenika-open-source.github.io/immutadot/api/immutadot-lodash/).

## License

immutad●t-lodash is [MIT licensed](https://github.com/zenika-open-source/immutadot/blob/master/LICENSE.md).
