export function curry(fn, minArity = fn.length) {
  function curried(prevArgs) {
    return (...args) => {
      if (prevArgs.length >= minArity - 1)
        return fn(args[0], ...prevArgs)

      return curried(prevArgs.concat(args))
    }
  }

  return (...args) => {
    if (args.length >= minArity)
      return fn(...args)

    return curried(args)
  }
}
