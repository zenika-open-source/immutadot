export function curry(fn, minArity = fn.length) {
  function curried(prevArgs) {
    return (...args) => (prevArgs.length >= minArity - 1) ? fn(args[0], ...prevArgs) : curried(prevArgs.concat(args))
  }

  return (...args) => (args.length >= minArity) ? fn(...args) : curried(args)
}
