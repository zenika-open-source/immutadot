# Getting started

This guide will give you an overview of immutad●t features.

Feel free to try the following examples with [runkit](https://npm.runkit.com/immutadot).

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

or you can directly download [sources](https://github.com/zenika-open-source/immutadot/releases).

## Setting nested properties

[ES2015+ destructuring](https://mdn.io/destructuring) provides you all necessary tools to keep nested structures immutable. The [spread operator](https://mdn.io/Spread_operator) is a succinct syntax to create new arrays and objects using existing ones.

```js
const lutraLutra = {
  commonNames: ['eurasian otter'],
}

const newLutraLutra = {
  ...lutraLutra,
  name: 'Lutra lutra',
}
```

With nested structures this syntax becomes more tedious to write, and harder to read:

```js
const animals = {
  weasels: {
    lutraLutra: {
      commonNames: ['eurasian otter'],
    },
  },
}

const newAnimals = {
  ...animals,
  weasels: {
    ...animals.weasels,
    lutraLutra: {
      ...animals.weasels.lutraLutra,
      name: 'Lutra lutra',
    },
  },
}
```

This can be done nicely with [`set()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/core.html#.set):

```js
import { set } from 'immutadot'

const animals = {
  weasels: {
    lutraLutra: {
      commonNames: ['eurasian otter'],
    },
  },
}

const newAnimals = set(animals, 'weasels.lutraLutra.name', 'Lutra lutra')
```

Deleting a nested property can be done with [`unset()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/core.html#.unset).

## Basic array operations

Values can be added in a nested array with [`push()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/array.html#.push):

```js
import { push } from 'immutadot'

const animals = {
  weasels: {
    lutraLutra: {
      name: 'Lutra lutra',
      commonNames: ['eurasian otter'],
    },
    // Some more weasels...
  },
}

const newAnimals = push(animals, 'weasels.lutraLutra.commonNames', 'european otter', 'common otter')
```

immutadot includes all common functions of Array's prototype, see [documentation's array section](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/array.html).

## Updating properties

immutad●t offers basic functions to work with primitive types such as [`toggle()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/lang.html#.toggle), [`stringConcat()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/string.html#.concat), or [`add()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/lang.html#.add), see [immutad●t's API](https://zenika-open-source.github.io/immutadot/api/immutadot/) for a full list.

It is also possible to perform custom updates with [`update()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/core.html#.update):

```js
import { update } from 'immutadot'

const animals = {
  weasels: {
    lutraLutra: {
      name: 'Lutra lutra',
      commonNames: ['eurasian otter', 'european otter', 'common otter'],
    },
    // Some more weasels...
  },
}

const newAnimals = update(animals, 'weasels.lutraLutra', lutraLutra => {
  return {
    scientificName: lutraLutra.name, // Rename property name to scientificName
    commonNames: lutraLutra.commonNames,
  }
})
```

## Batch operations

### Arrays

Operations can be applied on several elements of an array with the slice notation:

```js
import { capitalize } from 'immutadot-lodash' // capitalize uses lodash

const animals = {
  weasels: {
    lutraLutra: {
      scientificName: 'Lutra lutra',
      commonNames: ['eurasian otter', 'european otter', 'common otter'],
    },
    // Some more weasels...
  },
}

const newAnimals = capitalize(animals, 'weasels.lutraLutra.commonNames[:]')
```

The slice notation follows the syntax `[start:end]`, `start` and `end` are both optional, `start` defaults to `0` and `end` to `Array.length`.

### Objects

Batch operations are also possible on properties of an object with the list notation:

```js
import { set } from 'immutadot'

const animals = {
  weasels: {
    lutraLutra: {
      scientificName: 'Lutra lutra',
      commonNames: ['Eurasian otter', 'European otter', 'Common otter'],
    },
    pteronuraBrasiliensis: {
      scientificName: 'Pteronura brasiliensis',
      commonNames: ['Giant otter', 'Giant river otter'],
    },
    // Some more weasels...
  },
}

const newAnimals = set(animals, 'weasels.{*}.family', 'Mustelidae')
```

The list notation follows the syntax `{*}` to iterate over all the properties of an object.
It is also possible to pick specific properties with the syntax `{prop1,prop2}`.

### Path notation

For more information on the path notation of immutad●t, see the [path notation documentation](./PATH_NOTATION.md).

## Grouping modifications

Different operations can be grouped with [`flow()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/flow.html#.flow):

```js
import { flow, push, set } from 'immutadot'
import { capitalize } from 'immutadot-lodash'

const animals = {
  weasels: {
    lutraLutra: {
      commonNames: ['eurasian otter'],
    },
    pteronuraBrasiliensis: {
      scientificName: 'Pteronura brasiliensis',
      commonNames: ['Giant otter', 'Giant river otter'],
    },
    // Some more weasels...
  },
}

const newAnimals = flow(
  set('weasels.lutraLutra.scientificName', 'Lutra lutra'),
  push('weasels.lutraLutra.commonNames', 'european otter', 'common otter'),
  capitalize('weasels.lutraLutra.commonNames[:]'),
  set('weasels.{*}.family', 'Mustelidae'),
)(animals)
```

All immutad●t functions support currying the first parameter and can be used without `flow`:

```js
import { set } from 'immutadot'

const animals = {
  weasels: {
    lutraLutra: {
      commonNames: ['eurasian otter'],
    }
  }
}

const newAnimals = set('weasels.lutraLutra.scientificName', 'Lutra lutra')(animals)
```

## Reusing custom updates

New immutad●t functions can be created with [`convert()`](https://zenika-open-source.github.io/immutadot/api/immutadot/1.0/core.html#.convert):

```js
import { convert } from 'immutadot'

const renameProp = convert((obj, prop, newProp) => {
  const { [prop]: val, ...rest } = obj
  return {
    ...rest,
    [newProp]: val,
  }
})

const animals = {
  weasels: {
    lutraLutra: {
      name: 'Lutra lutra',
      commonNames: ['eurasian otter', 'european otter', 'common otter'],
    },
    // Some more weasels...
  },
}

const newAnimals = renameProp(animals, 'weasels.lutraLutra', 'name', 'scientificName')
```
