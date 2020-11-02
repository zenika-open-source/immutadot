![immutadot logo](https://raw.githubusercontent.com/zenika-open-source/immutadot/master/misc/otter.svg?sanitize=true)
===

# Migrating from 0.3 to 1.0

## Split in two packages

The core of immutadot has been rewritten without [lodash](https://lodash.com/), and immutadot now has two npm packages [immutadot](https://www.npmjs.com/package/immutadot) and [immutadot-lodash](https://www.npmjs.com/package/immutadot-lodash).

### immutadot package

immutadot package now contains exclusively functions based on [ES2015+ language and standard library](https://mdn.io/JavaScript/Reference).

For a complete list see [immutadot's API documentation](https://immutadot.zenika.com/api/immutadot/1.0/).

immutadot's organization in namespaces has changed a little, see [Namespaces modifications](#namespaces-modifications) for more details.

Some functions such as [`filter()`](https://immutadot.zenika.com/api/immutadot/1.0/array.html#.filter) and [`map()`](https://immutadot.zenika.com/api/immutadot/1.0/array.html#.map) are now available in immutadot and in immutadot-lodash. This is because immutadot's version handles only arrays whereas immutadot-lodash's version handles collections (which includes objects), it is up to you to choose which version suits best your needs.

### immutadot-lodash package

All immutadot functions directly based on lodash utilities (such as [`mapValues()`](https://immutadot.zenika.com/api/immutadot-lodash/1.0/object.html#.mapValues)) have been moved into immutadot-lodash.

For a complete list see [immutadot-lodash's API documentation](https://immutadot.zenika.com/api/immutadot-lodash/1.0/).

Such cases are easily migrated:
```diff
-import { mapValues } from 'immutadot'
+import { mapValues } from 'immutadot-lodash'

 mapValues(obj, 'nested.prop', val => val + 1)
```

All immutadot-lodash functions have kept their former namespace, which is their original lodash namespace.

## Curried `obj` parameter

immutadot functions now support currying the `obj` (leftmost) parameter:

```js
set('nested.prop', 'val')(obj)
```

This allows them to be used in [`flow()`](https://immutadot.zenika.com/api/immutadot/1.0/core.html#.flow) (see [Chained operations](#chained-operations)).

Partial functions returned by calls without `obj` are unary, therefore you may call them with more than one parameter, only the first one will be used:

```js
set('nested.prop', 'val')(obj, discarded1, discarded2)
```

## Chained operations

[`chain()`](https://immutadot.zenika.com/api/immutadot/0.3/seq.html#.chain) has been removed in favor of [`flow()`](https://immutadot.zenika.com/api/immutadot/1.0/core.html#.flow).

The main reasons behind this are that `chain` had some major drawbacks:
 - Imports all of immutadot's functions
 - Difficult to extend
 - Hard to test

Migrating from `chain` to `flow` is pretty easy:

```diff
-import { chain } from 'immutadot'
+import { flow, set, unset, update } from 'immutadot'

-chain(obj)
-  .set('nested.prop1', 'val')
-  .update('nested.prop2', v => v + 1)
-  .unset('nested.prop3')
-  .value()
+flow(
+  set('nested.prop1', 'val'),
+  update('nested.prop2', v => v + 1),
+  unset('nested.prop3'),
+)(obj)
```

### Caveat

If you were using `chain()`'s second parameter to avoid repeating a common path portion, no equivalent is available on `flow()`, therefore you have to add the common portion in all the operations:

```diff
-import { chain } from 'immutadot'
+import { flow, set, unset, update } from 'immutadot'

-chain(obj, 'nested')
-  .set('prop1', 'val')
-  .update('prop2', v => v + 1)
-  .unset('prop3')
-  .value()
+flow(
+  set('nested.prop1', 'val'),
+  update('nested.prop2', v => v + 1),
+  unset('nested.prop3'),
+)(obj)
```

## Path notation

immutadot now uses its own path parser instead of lodash's [`toPath()`]() utility.

If your code contains cumbersome or incorrect paths (such as `set(obj, 'a[0.b', 'val')`) you might experience changes of behavior.

### Advandced path notation

immutadot 1.0 comes with an improved path notation, allowing to iterate over arrays and objects, check out the [path notation documentation](./PATH_NOTATION.md) for more information.

You might be able to rewrite some of your code like this:

```diff
-import { map, set } from 'immutadot'
+import { set } from 'immutadot'

 const obj = {
   arr: [
     { prop: 'foo' },
     ...
   ],
 }

-map(obj, 'arr', item => set(item, 'prop', 'bar'))
+set(obj, 'arr[:].prop', 'bar')
```

## Discontinued features

### `using()` utility

[`using()`](https://immutadot.zenika.com/api/immutadot/0.3/util.html#.using) has been removed for the same reasons as `chain()`:
 - Imports all of immutadot's functions
 - Difficult to extend

immutadot now has a [`get()`](https://immutadot.zenika.com/api/immutadot/1.0/core.html#.get) function that allows you to do the same:

```diff
-import { using } from 'immutadot'
+import { get, set } from 'immutadot'

-using('nested.prop2').set(obj, 'nested.prop1')
+set(obj, 'nested.prop1', get(obj, 'nested.prop2'))
```

`get` has the advantage of allowing a default value:

```js
get(obj, 'nested.prop', 'valueIfUndefined')
```

## Namespaces modifications

If you were importing or requiring immutadot functions from the root path `"immutadot"`, this section doesn't affect you.

All immutadot-lodash functions have kept their former namespace, which is their original lodash namespace.

In immutadot core package the `math` and `utility` (and `seq`) namespaces have been removed.

Here is a summary of namespace changings of functions that might affect you:
 - `add()`: `math` -> `lang`
 - `convert()`: `utility` -> `core`
 - `divide()`: `math` -> `lang`
 - `multiply()`: `math` -> `lang`
 - `set()`: `object` -> `core`
 - `subtract()`: `math` -> `lang`
 - `unset()`: `object` -> `core`
 - `update()`: `object` -> `core`
