const curried21 = fn => arg1 => arg0 => fn(arg0, arg1)

const curried32 = fn => (arg1, arg2) => arg0 => fn(arg0, arg1, arg2)
const curried31 = fn => arg1 => (...args) => {
  if (args.length === 2) return fn(args[1], arg1, args[0])
  return curried32(fn)(arg1, args[0])
}
const curried3 = fn => (...args) => {
  if (args.length === 2) return curried32(fn)(...args)
  return curried31(fn)(...args)
}

const curriedN = (fn, arity) => (...firstArgs) => {
  const curried = (...prevArgs) => (...args) => {
    if (prevArgs.length >= arity - 1)
      return fn(args[0], ...prevArgs)

    return curried(...prevArgs, ...args)
  }

  return curried(...firstArgs)
}

export function curry(fn, arity = fn.length, fixedArity = false) {
  let curried

  if (fixedArity) {
    switch (arity) {
    case 2:
      curried = curried21(fn)
      break
    case 3:
      curried = curried3(fn)
      break
    }
  }

  if (!curried) curried = curriedN(fn, arity)

  // TODO Should we truncate args when fixedArity (when calling fn)
  return (...args) => args.length >= arity ? fn(...args) : curried(...args)
}
