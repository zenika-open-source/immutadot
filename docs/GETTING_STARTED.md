![immutadot logo](https://raw.githubusercontent.com/Zenika/immutadot/master/misc/otter.svg?sanitize=true)
===

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

or you can directly download [sources](https://github.com/Zenika/immutadot/releases).

## Setting nested properties

[ES2015+ destructuring](https://mdn.io/destructuring) provides you all necessary tools to keep nested structures immutable. The [spread operator](https://mdn.io/Spread_operator) is a succinct syntax create new arrays and objects using existing ones.

```js
const otter = {
  family: 'Mustelidae',
  order: 'Carnivora'
}
const updatedOtter = {
  ...otter,
  classification: 'Mammalia'
}
```

With nested structures this syntax becomes more tedious to write, and harder to read:

```js
const animals = {
  weasels: {
    badger: {
      vernacularName: 'badger',
      scientificName: 'Meles meles'
    },
    otter: {
      vernacularName: 'otter',
    }
  }
}

const newAnimals = {
  ...animals,
  weasels: {
    ...animals.weasels,
    otter: {
      ...animals.weasels.otter,
      scientificName: 'Lutrinae'
    }
  }
}
```

This can be done nicely with immutadot's [`set()`](https://zenika.github.io/immutadot/immutadot/1.0/core.html#.set) core utility:

```js
const updatedAnimals = set(animals, 'animals.weasels[1].scientificName', 'Lutrinae')
```

It seems much more clear, no?

## Basic array operations

Assume that our badger object have a property sharingName that is an array of other species with the common name of badger but our favorite one is missing.

We are pretty fond of honey badger aka ratel. Let's add it in our weasels array with [`push()`](https://zenika.github.io/immutadot/immutadot/1.0/array.html#.push) function.

```js
const updatedAnimals = push(animals, 'animals.weasels.badger.sharingName', 'Honey badger')
```

There are a few more operations you can find out in our [documentation's array section](https://zenika.github.io/immutadot/immutadot/1.0/array.html).

## Basic collection operations

All collection's operations are in immutadot-lodash given that collection is a concept brought by lodash. In our case we want to [`reject()`](https://zenika.github.io/immutadot/immutadot-lodash/1.0/collection.html#.reject) all characteristics that aren't numbers.

```js
const updatedAnimals = reject(animals, 'animals.weasels.otter.characteristics', characteristic => Number.isInteger(characteristic))
```

## Path notation

immutad●t comes with an improved path notation, allowing to iterate over arrays and objects, check out the [path notation documentation](./PATH_NOTATION.md) for more information.

We will use improved path notation in the following examples.

## Grouping multiple operations

immutad●t has a functionnal utility called [`flow()`](https://zenika.github.io/immutadot/immutadot/1.0/flow.html#.flow) that helps you compose multiple operations and apply them on an input.

We want in our weasels array only those whose scientific names begin with **M** character and we forgot to capitalize their vernacular, let's repair this mistake.

```js
const filterAndCapitalizeAnimals = flow(
  filter('weasels', weasel => weasel.scientificName.startsWith('M'))
  capitalize('weasels[:].scientificName')
)

const alteredAnimals = filterAndCapitalizeAnimals(updatedAnimals)
```

With [`flow()`](https://zenika.github.io/immutadot/immutadot/1.0/flow.html#.flow) utility the true power of functional programming will be unleashed in your code!

## Performing custom updates

You can't found out a function that fits with your needs ? [`update()`](https://zenika.github.io/immutadot/immutadot/1.0/core.html#.update) take an updater as parameter and let you apply custom updates on your data.

```js
const incIfNumber = (v, i = 0) => {
  if (Number.isInteger(v)) {
    return v + i
  }
  return v
}

const updatedAnimals = update(animals, 'weasels.otter.characteristics{*}', incIfNumber, 2)
```

## Creating custom operations

You want to easily reuse your functions that apply custom updates ? Wraps your updater function with [`convert()`](https://zenika.github.io/immutadot/immutadot/1.0/core.html#.convert). It returns a function with the same signature as the immutad●t's operations.

```js
const incIfNumberProp = convert(incIfNumber)

const updatedAnimals = incIfNumberProp(animals, 'weasels.otter.characteristics{*}', 2)
```
