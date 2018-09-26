# Immutability in JavaScript

According to (wikipedia)[https://en.wikipedia.org/wiki/Immutable_object] an *immutable object (unchangeable object) is an object whose state cannot be modified after it is created*. This rule is quite simple, if you want to modify some property of an object you have to do it on a copy. We will see a bit later what improvements and fancy features it unlocks for our developments.

## EcmaScript

EcmaScript provides utilities to keep our data immutable. Arrays and objects APIs contain methods to create copies and even prevent instances from being updated. More recently EcmaScript introduced a new syntaxes to create copies of objects and arrays.

### Object.assign

We want to add a name property in our object.

https://gist.github.com/frinyvonnick/a281f15288d3ab90ce5354f01df52ccf

We can do it with `Object.assign` and a little trick. Basically it copies all properties from an object into another one, thus it mutates the target object. We use a small trick, passing an empty object as first parameter, which creates a new reference.

https://gist.github.com/frinyvonnick/98878e45d6a8ccb4618238dbec175ae9

We now have a new object with our new name property and a commonNames property remain unchanged. With this method you can create/overwrite multiple properties at the same time.

### Array.concat

Now let's do it with an array. We want to add two new elements in an array in an immutable way.

https://gist.github.com/frinyvonnick/461d4dbad6bff965a60b734f86619faa

Unlike `Array.push`, `Array.concat` does not mutate our array. Instead, it returns a new array.

https://gist.github.com/frinyvonnick/3959e7972688a41055671bceb6228056

This method is flexible. It takes as many elements as you want. They can be either values or arrays.

### Object.freeze

`Object.freeze` isn't really familiar. It lets you make an object immutable ! It prevents every type of mutation (creation, modification, deletion) induced by the use of setters.

https://gist.github.com/frinyvonnick/d1dd1cbf2924b2428b07713d1ad2adf7

We will try to delete name property after object has been frozen.

https://gist.github.com/frinyvonnick/acc86d1c2fe14c23cd6363946cc253da

Reallocation isn't necessary since the object passed as parameter has been made immutable by `Object.freeze`. This method has two available modes:

- A non-strict mode that does not apply mutations
- A strict mode that throws a `TypeError` if you try to apply mutations

Be careful, it is not recursive. Our property commonNames isn't immutable.

### Spread operator

The spread operator syntax has been introduced in ES2015 for arrays and in ES2018 for objects. It copies all properties of a given object into a new object literal.

https://gist.github.com/frinyvonnick/61908a0e1bdcd97ba965570796c0c665

With arrays, it copies all values of an array into a new array.

https://gist.github.com/frinyvonnick/7ec4cd039fd79f16864546c51b18ab95

Easily readable and unified between arrays and objects, it replaces nicely assign and concat. It is possible to spread multiple arrays and objects in a same literal.

## Why use immutability?

You found out how to make objects and arrays immutable with JavaScript but we didn't explain yet why using immutability is so necessary nowadays. As developers, we are always looking for a way to write more maintainable and readable code. Some paradigms such as Functionnal Programming are focusing on this.

> Functional programming’s goal is to allow us to think less and write more descriptive code.
>
> -- <cite>[Alexander Kondov](https://hackernoon.com/functional-programming-paradigms-in-modern-javascript-immutability-4e9751ca005c)</cite>

It has a declarative approach of programming, which means that you focus on describing what your program must accomplish rather than how it should do it. It gives more meaning to your code so the next developper will understand it more easily. Functional programming brings along other concepts that help reach this goal, such as Immutability.

### What are the benefits?

Does it sound like a hype term to you? Immutability addresses some problems we encounter everyday while programming:

- Avoid side effects
- Data changes detection made simple (shallow comparison)
- Explicit data changes
- Memoization
- Memory optimization
- Better rendering performances
- Easy testing

> « Unlike most trends in the world of JavaScript, data immutability is bound to stick with us for a while, and for good reason: firstly, because it’s not a trend: it’s a way of coding (and thinking in code) that promotes clarity, ease of use and understanding data flow, and makes code less prone to errors. »
>
> -- <cite>[Ricardo Magalhães](https://hackernoon.com/data-immutability-with-vanilla-javascript-63834a65a6c9)</cite>

In the last few years one of our biggest challenges has been to find an efficient way to detect changes in our data to determine whether or not we should render our interfaces. It's easy to detect changes between primitive values, but it's a completely different issue for objects and arrays. You could compare them by value but you would have to implement recursive algorithms and deal with potential issues like cyclical references. Another method would be to compare object references with the strict equality operator `===`. It's more effective and there isn't any risk to enter in some infinity loop of death. That's why modern frameworks enforce this concept.

### Highlighted by modern frameworks/libraries

Modern frontend frameworks and libraries are based on a concept that improves drastically performances. This is the well-known Virtual DOM. This technology has been created from a simple evidence: DOM manipulations are expensive.

For the benefits explained in the previous sections, frontend frameworks and libraries chose to use immutability in order to improve their performances. Nowadays we have to deal with more and more data in our applications, and therefore more markups. So our browsers need to handle much more computations than 10 years earlier. DOM operations are expensive, modern frameworks tend to reduce the number of DOM updates.

### Why do we need utilities libraries

As we saw earlier the way to handle immutability in EcmaScript is made simple thanks to syntactic sugar but it finds its limits in nested structures. With the arrival of libraries like redux, nested structures have become more popular.

https://gist.github.com/frinyvonnick/67664aa58d4c4f0c73e38c38d6c349a2

As you can see it becomes more tedious to write and harder to read. Simple use-cases like overriding an index of an array aren't easily achievable.

https://gist.github.com/frinyvonnick/0d883ce1bb07a5494318ec11c2152e92

These reasons are sufficient to start finding out some tool that help focusing on what really matters. The meaning of your code.

In a further part we will see how [immutadot](https://immutadot.zenika.com) allows us to address all of those problems.
