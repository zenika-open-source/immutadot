---
layout: default
avatar: true
permalink: /
---
# immutad●t
A JavaScript library to deal with nested immutable structures.

```js
set({ english: { greeting: 'Hi' } }, 'english.greeting', 'Hello')
// → { english: { greeting: 'Hello' } }

push({ i18n: { languages: ['English', 'French'] } }, 'i18n.languages', 'German', 'Spanish')
// → { i18n: { languages: ['English', 'French', 'German', 'Spanish'] } }
```
immutad●t gives you a short and meaningful syntax to apply operations on immutable structures.

---
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

---
## Usage
ES modules:

```js
import { set } from 'immutadot'
```

CommonJS:  

```js
const { set } = require('immutadot')
```
---
## Try it
<div id="repl">
const { set } = require('immutadot')

const animals = {
    weasels: {
      lutraLutra: {
        commonNames: ['eurasian otter'],
      },
    },
}

const newAnimals = set(animals, 'weasels.lutraLutra.name', 'Lutrinae')
</div>

---
## Getting started

A fast overview of immutad●t's features is available in the [Getting started](https://github.com/Zenika/immutadot/blob/master/docs/GETTING_STARTED.md) guide.
