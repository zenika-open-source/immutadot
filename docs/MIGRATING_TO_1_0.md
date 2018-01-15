# Migrating from 0.3 to 1.0

## Chained operations
[`chain()`](https://zenika.github.io/immutadot/immutadot/0.3/seq.html#.chain) has been removed in favor of [`flow()`](https://zenika.github.io/immutadot/immutadot/1.0/core.html#.flow).

`chain()` had some major drawbacks :
 - Imports the whole of immutadot
 - Is difficult to extend

Migrating from `chain()` to `flow()` is pretty easy :

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
TODO chain second parameter
