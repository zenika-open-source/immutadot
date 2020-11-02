# Path notation

To describe deeply nested properties immutadot uses standard [property access notation](https://mdn.io/Property_Accessors) and [array access notation](https://mdn.io/Array).

Furthermore immutadot supports [property list](#property-list-notation) and [slice](#slice-notation) notations allowing access to several properties or several array indexes at the same time.

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

The bracket notation is the same as JavaScript [bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors). It gives access to properties with an invalid identifier or dots in it.

```js
set({}, 'prop[nested.1]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested.1": "new value"
//   }
// }
```

## Array access notation

Similar to the JavaScript way to access elements of an array, gives an easy access to deeply nested elements:

```js
set({}, 'prop.nested[0]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       "new value"
//     ]
//   }
// }
``` 

## Property list notation

We will use an initial object for the following examples: 

```js
// {
//   "prop": {
//     "nested": {
//       "0": 'old value',
//       "1": 'old value',
//       "2": 'old value'
//     }
//   }
// }
```


The list notation provides a way to apply operation on multiple properties of an objet:

```js
set(initial, 'prop.nested{foo,bar}', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": {
//       "foo": 'new value',
//       "bar": 'new value',
//       "foobar": 'old value'
//     }
//   }
// }
``` 

### Wildcard

A wildcard character in list notation will apply operation on all properties of an object:

```js
set(initial, 'prop.nested{*}', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": {
//       "foo": 'new value',
//       "bar": 'new value',
//       "foobar": 'new value'
//     }
//   }
// }
``` 

## Slice notation

We will use an initial object for the following examples: 

```js
// {
//   "prop": {
//     "nested": [
//       'old value',
//       'old value',
//       'old value',
//       'old value'
//     ]
//   }
// }
```

Inspired from the [golang](https://blog.golang.org/slices) the slice notation gives you access to a chunk of an array. A slice take a starting index and an ending index:

```js
set(initial, 'prop.nested[1:3]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       'old value',
//       'new value',
//       'new value',
//       'old value'
//     ]
//   }
// }
``` 

If you don't provide starting index the slice starts from 0:

```js
set(initial, 'prop.nested[:3]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       'new value',
//       'new value',
//       'new value',
//       'old value'
//     ]
//   }
// }
``` 

If you don't provide ending index the slice goes to the end of the array:

```js
set(initial, 'prop.nested[1:]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       'old value',
//       'new value',
//       'new value',
//       'new value'
//     ]
//   }
// }
``` 


If you don't provide indexes at all, the slice is the whole array:

```js
set(initial, 'prop.nested[:]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       'new value',
//       'new value',
//       'new value',
//       'new value'
//     ]
//   }
// }
``` 

### Negative indexes

The slice notation supports negative indexes:

```js
set(initial, 'prop.nested[1:-1]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       'old value',
//       'new value',
//       'new value',
//       'old value'
//     ]
//   }
// }
``` 

```js
set(initial, 'prop.nested[-1:]', 'new value')
// Returns:
// {
//   "prop": {
//     "nested": [
//       'old value',
//       'old value',
//       'old value',
//       'new value'
//     ]
//   }
// }
``` 
