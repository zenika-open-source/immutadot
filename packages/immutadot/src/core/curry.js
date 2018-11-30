export function curry(fn, arity = fn.length, fixedArity = false) {
  return (...args) => {
    if (args.length >= arity) return fn(...args)

    const allArgs = args

    function curried(...args) {
      if (allArgs.length >= arity - 1) {
        if (fixedArity) {
          switch (arity) {
          case 2:
            return fn(args[0], allArgs[0])
          case 3:
            return fn(args[0], allArgs[0], allArgs[1])
          case 4:
            return fn(args[0], allArgs[0], allArgs[1], allArgs[2])
          case 5:
            return fn(args[0], allArgs[0], allArgs[1], allArgs[2], allArgs[3])
          }
        }

        return fn(args[0], ...allArgs)
      }

      allArgs.push(...args)

      return curried
    }

    return curried
  }
}
