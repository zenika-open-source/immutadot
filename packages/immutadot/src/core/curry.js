export function curry(fn, arity = fn.length, fixedArity = false) {
  return (...args) => {
    if (args.length >= arity) return fn(...args)

    function curried(prevArgs) {
      return (...args) => {
        if (prevArgs.length >= arity - 1) {
          if (fixedArity) {
            switch (arity) {
            case 2:
              return fn(args[0], prevArgs[0])
            case 3:
              return fn(args[0], prevArgs[0], prevArgs[1])
            case 4:
              return fn(args[0], prevArgs[0], prevArgs[1], prevArgs[2])
            case 5:
              return fn(args[0], prevArgs[0], prevArgs[1], prevArgs[2], prevArgs[3])
            }
          }

          return fn(args[0], ...prevArgs)
        }

        return curried(prevArgs.concat(args))
      }
    }

    return curried(args)
  }
}
