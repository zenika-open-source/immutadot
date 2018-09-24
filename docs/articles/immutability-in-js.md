# Immutability in JavaScript

According to (wikipédia)[https://en.wikipedia.org/wiki/Immutable_object] an *immutable object (unchangeable object) is an object whose state cannot be modified after it is created*. This rule is quite simple, if you want to modify some property of an object you have to do it on a copy. We will see a bit later what improvements and fancy features it unlocks for our developments.

## EcmaScript

EcmaScript provides utilities to keep our data immutable. APIs of arrays and objects have methods to create copies and even prevent instances to be updated. More recently EcmaScript brings us a brand new syntax that makes it easier to achieve it.

### Object.assign

We want to add a name property in our object.

https://gist.github.com/frinyvonnick/a281f15288d3ab90ce5354f01df52ccf

We can do it with `Object.assign` and a little trick. Basically it copies all properties of an object to another one, thus it mutates the target object. So we use a small trick, by passing an empty object at first parameter we create a new reference.

https://gist.github.com/frinyvonnick/98878e45d6a8ccb4618238dbec175ae9

So we now have a new object with our new name property and a commonNames property remaining unchanged. With this method you can create/overwrite multiple properties at the same time.

### Array.concat

Now let's do it with an array. We have an array and we want to add two new elements in an immutable way.

https://gist.github.com/frinyvonnick/461d4dbad6bff965a60b734f86619faa

`Array.concat` doesn't mutate our array in contrary of `Array.push` an return a new array without using trick like we did with `Object.assign`.

https://gist.github.com/frinyvonnick/3959e7972688a41055671bceb6228056

This method is flexible. It takes as many elements as you want and they can be values or arrays.

### Object.freeze

`Object.freeze` isn't really familiar. It let you make an object immutable ! It prevents every type of mutation (creation, modification, deletion) included using setter.

https://gist.github.com/frinyvonnick/d1dd1cbf2924b2428b07713d1ad2adf7

We will try to delete name property after object has been frozen.

https://gist.github.com/frinyvonnick/acc86d1c2fe14c23cd6363946cc253da

Reallocation isn't necessary since the object passed as parameter is made immutable by `Object.freeze`. This methode has two modes available:

- In non-strict mode it doesn't apply mutations
- In strict it throws a `TypeError` if you try to apply mutations on a frozen object

Be carefull, it isn't recursive. So our property commonNames isn't immutable.

### Spread operator

The spread operator syntax have been introduced in ES2015 for arrays and ES2018 for objects. It let's you copy all properties of an object in a new object literal.

https://gist.github.com/frinyvonnick/61908a0e1bdcd97ba965570796c0c665

For arrays, it copies all values of an array to a new array literal.

https://gist.github.com/frinyvonnick/7ec4cd039fd79f16864546c51b18ab95

Easily readable and unified between arrays and objects. It replaces nicely assign and concat. It is possible to spread multiple arrays and object in a same literal.

## Why use immutability ?

You found out how to make objects and arrays immutable with JavaScript but we didn't tell why using immutability is so necessary nowadays. As developper, we always search for a way to write more maintainable and readable code. Some paradigms as Functionnal Programming are focusing on this.

> Functional programming’s goal is to allow us to think less and write more descriptive code.
>
> -- <cite>[Alexander Kondov](https://hackernoon.com/functional-programming-paradigms-in-modern-javascript-immutability-4e9751ca005c)</cite>

It has a declarative approach of programming that means you focus on describing what your program must accomplish rather than how it should does it. It brings more meaning to your code so the next developper will understand it more easily. Functional programming brings alongside other concepts that helps to reach this goal, such as Immutability.

### What are the benefits ?

It sounds like a hype term to you ? Immutability answer to some problems we encounter everyday while programming:

- Avoid side effects
- Data changes detection made simple (Shallow comparison)
- Explicit data changes
- Memoization
- Memory optimization
- Improve rendering performances
- Easy testing

> « Unlike most trends in the world of JavaScript, data immutability is bound to stick with us for a while, and for good reason: firstly, because it’s not a trend: it’s a way of coding (and thinking in code) that promotes clarity, ease of use and understanding data flow, and makes code less prone to errors. »
>
> -- <cite>[Ricardo Magalhães](https://hackernoon.com/data-immutability-with-vanilla-javascript-63834a65a6c9)</cite>

In the last few years one of our biggest challenge has been to find an efficient way to detect changes in our data to determine when to re-render our interfaces. It's easy to detect changes between primitive values, but it's a whole other problem for objects and arrays. You could compare it by value but you will to implements recursive algorithms and you may still have issues with cyclical reference object. Another method would be to compare object references with the strict equality operator `===`. It's more effective and there isn't any risk to enter in some infinity loop of death. That's why modern frameworks enforce this concept.

### Highlighted by modern frameworks/libraries

Modern frontend frameworks and libraries lies on a concept that improve drastically performances. This is the well-know Virtual DOM. This technology has been created from a simple evidence. DOM manipulations are expensive.

For the benefits explained in the previous sections frontend frameworks and libraries choose to use immutability for improving their performances. Nowadays we have to deal with more and more data in our applications, it means more markup. So our browsers need to handle much more computations than 10 years earlier. DOM operations are expensive, mordern ui framework tends to minimize the number of update they make to the DOM.

### Why do we need utilities libraries

As we saw it a bit earlier the way to handle immutability in Ecmascript is simple thanks to syntactic sugar brought by ES6 but it finds its limits in nested structures. With the arrival of libraries like redux nested structures have been popularized.

https://gist.github.com/frinyvonnick/67664aa58d4c4f0c73e38c38d6c349a2

As you can see it becomes more tedious to write, and harder to read. Simple use-cases like overriding an index of an array aren't easily achievable.

https://gist.github.com/frinyvonnick/0d883ce1bb07a5494318ec11c2152e92

Theses reasons are sufficient in themselves to start finding out some tool that helps focusing on what really matters. The meaning of your code.

In a further part we will see how we answered these problems with [immutadot](https://immutadot.zenika.com), a library to deal with nested immutable structures.
