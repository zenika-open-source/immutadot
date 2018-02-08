---
layout: default
avatar: true
permalink: /
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
