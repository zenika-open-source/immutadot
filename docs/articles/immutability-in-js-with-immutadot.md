# Immutability in js with immutad●t

## Declarative programming

As developper, we always search for a way to write more maintainable and readable code. Some paradigms as Functionnal Programming are focusing on this.

> Functional programming’s goal is to allow us to think less and write more descriptive code.
>
> -- <cite>[Alexander Kondov](https://hackernoon.com/functional-programming-paradigms-in-modern-javascript-immutability-4e9751ca005c)</cite>

It has a declarative approach of programming that means you focus on describing what your program must accomplish rather than how it should does it. It brings more meaning to your code so the next developper will understand it more easily. Functional programming brings alongside other concepts that helps to reach this goal, such as Immutability.

## Immutability

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

Javascript comes with a few functions helping you to keep your variables immutable.
