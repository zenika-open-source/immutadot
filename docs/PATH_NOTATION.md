![immutadot logo](https://raw.githubusercontent.com/Zenika/immutadot/master/misc/otter.svg?sanitize=true)
===

# Path notation

To describe deeply nested properties immutad●t uses standard [property access notation](https://mdn.io/Property_Accessors) and [array access notation](https://mdn.io/Property_Accessors).

Furthermore immutad●t supports [property list](#property-list-notation) and [slice](#slice-notation) notations allowing access to several properties or several array indexes at the same time.

## Dot notation

Similar to the JavaScript dot notation used to access properties of an object, gives an easy access to deeply nested properties:

```js
set(obj, 'very.very.deeply.nested.property', 'new value')
```

A leading dot may be added at the start of the path:

```js
set({}, '.nested.prop', 'new value')
// Returns:
// {
//   "nested": {
//     "prop": "new value"
//   }
// }
```

Two consecutive dots will add an empty named property in the path:

```js
set({}, '..prop', 'new value')
// Returns:
// {
//   "": {
//     "prop": "new value"
//   }
// }
```

A trailing dot will add a last empty named property to the path:

```js
set({}, 'prop.', 'new value')
// Returns:
// {
//   "prop": {
//     "": "new value"
//   }
// }
```

In order to access a property with dots in its name, [bracket notation](#bracket-notation-property-access) should be used.

Integer properties will still be considered object properties (for array indexes see [array access notation](#array-access-notation)):

```js
set({}, 'nested.1', 'new value')
// Returns:
// {
//   "nested": {
//     "1": "new value"
//   }
// }
```

## Bracket notation (property access)

## Array access notation

## Property list notation

### Wildcard

## Slice notation

### Negative indexes

## Edge cases
TODO empty string
TODO nil
TODO erroneous
