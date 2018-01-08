![immutadot logo](https://raw.githubusercontent.com/Zenika/immutadot/master/misc/otter.svg?sanitize=true)
=================

# Getting started

As you already know immutad●t is a javascript library that help you dealing with nested immutable structure. The easiest way to try immutad●t is to use [runkit](https://npm.runkit.com/immutadot). You can test all the following examples in it. If you rather use immutad●t in local, checkout out the [Installation](https://raw.githubusercontent.com/Zenika/immutadot/master/README.md) section of our README.

## Setting nested properties

ES2015+ provides you all necessary tools to keep nested structures immutable. The [spread operator](https://mdn.io/Spread_operator) is a succinct syntax create new arrays and objects using existing ones.

```js
const otter = {
  family: 'Mustelidae',
  order: 'Carnivora'
}
const updatedOtter = {
  ...otter,
  class: 'Mammalia'
}
```

It becomes more verbose with nested structures. You have to spread each level of your structures to keep it immutable.

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

const updatedAnimals = {
  ...animals,
  weasels: [...animals.weasel]
}

updatedAnimals.weasels[1] = {
  ...updatedAnimals.weasels[1],
  scientificName: 'Lutrinae'
}
```

immutad●t provides you a set of utilities that use a elegant path notation that helps you apply operations on your data without carrying about keeping your structure immutable. Let's refactor our last example with immutad●t's `set` function.

```js
const updatedAnimals = set(animals, 'animals.weasels[1].scientificName', 'Lutrinae')
```

It seems much more clear, no?

## Basic array operations

immutad●t comes with some built-in operations that makes it easy to manipulate arrays. The most of them are already implemented in [ES2015+](https://mdn.io/Array) immutad●t ensures you their results are immutable.

We are pretty fond of honey badger aka ratel. Let's add it in our weasels array with `push` function.

```js
const updatedAnimals = push(animals, 'animals.weasels', {
  vernacularName: 'ratel',
  scientificName: 'Mellivora capensis'
})
```

It shouldn't desorient you and sound very familiar. There are a few more operations you can find out in our [documentation's array section](https://zenika.github.io/immutadot/immutadot/1.0/array.html).

## Basic collection operations

## Grouping multiple operations

immutad●t has a functionnal utility called `flow` that helps you compose multiple operations and apply them on an input. What's great about `flow` is that it produces a new function that is easily testable.

We want in our weasels array only those whose scientific names begin with **M** character and we forgot to capitalize their vernacular, let's repair this mistake.

```js
const filterAndCapitalizeAnimals = flow(
  filter('weasels', weasel => weasel.scientificName.startsWith('M'))
  capitalize('weasels[:].scientificName')
)
```

const alteredAnimals = filterAndCapitalizeAnimals(updatedAnimals)

With `flow` utility the true power of functional programming will be unleashed in your code!

## Performing custom updates

## Creating custom operations

## Path notation
