const curried2 = fn => arg1 => arg0 => fn(arg0, arg1)

const curried32 = fn => (arg1, arg2) => arg0 => fn(arg0, arg1, arg2)
const curried31 = fn => arg1 => (...args) => {
  if (args.length === 1) return curried32(fn)(arg1, args[0])
  return fn(args[1], arg1, args[0])
}
const curried3 = fn => (...args) => {
  if (args.length === 1) return curried31(fn)(...args)
  return curried32(fn)(...args)
}

const curried43 = fn => (arg1, arg2, arg3) => arg0 => fn(arg0, arg1, arg2, arg3)
const curried42 = fn => (arg1, arg2) => (...args) => {
  if (args.length === 1) return curried43(fn)(arg1, arg2, args[0])
  return fn(args[1], arg1, arg2, args[0])
}
const curried41 = fn => arg1 => (...args) => {
  if (args.length === 1) return curried42(fn)(arg1, args[0])
  if (args.length === 2) return curried43(fn)(arg1, args[0], args[1])
  return fn(args[2], arg1, args[0], args[1])
}
const curried4 = fn => (...args) => {
  if (args.length === 1) return curried41(fn)(...args)
  if (args.length === 2) return curried42(fn)(...args)
  return curried43(fn)(...args)
}

const curried54 = fn => (arg1, arg2, arg3, arg4) => arg0 => fn(arg0, arg1, arg2, arg3, arg4)
const curried53 = fn => (arg1, arg2, arg3) => (...args) => {
  if (args.length === 1) return curried54(fn)(arg1, arg2, arg3, args[0])
  return fn(args[1], arg1, arg2, arg3, args[0])
}
const curried52 = fn => (arg1, arg2) => (...args) => {
  if (args.length === 1) return curried53(fn)(arg1, arg2, args[0])
  if (args.length === 2) return curried54(fn)(arg1, arg2, args[0], args[1])
  return fn(args[2], arg1, arg2, args[0], args[1])
}
const curried51 = fn => arg1 => (...args) => {
  if (args.length === 1) return curried52(fn)(arg1, args[0])
  if (args.length === 2) return curried53(fn)(arg1, args[0], args[1])
  if (args.length === 3) return curried54(fn)(arg1, args[0], args[1], args[2])
  return fn(args[3], arg1, args[0], args[1], args[2])
}
const curried5 = fn => (...args) => {
  if (args.length === 1) return curried51(fn)(...args)
  if (args.length === 2) return curried52(fn)(...args)
  if (args.length === 3) return curried53(fn)(...args)
  return curried54(fn)(...args)
}

const curriedN = (fn, arity) => (...firstArgs) => {
  const curried = (...prevArgs) => (...args) => {
    if (prevArgs.length >= arity - 1)
      return fn(args[0], ...prevArgs)
    return curried(...prevArgs, ...args)
  }
  return curried(...firstArgs)
}

// FIXME doc with explanation of fixedArity's purpose and inconsistency
export function curry(fn, arity = fn.length, fixedArity = false) {
  let curried

  if (fixedArity) {
    switch (arity) {
    case 2:
      curried = curried2(fn)
      break
    case 3:
      curried = curried3(fn)
      break
    case 4:
      curried = curried4(fn)
      break
    case 5:
      curried = curried5(fn)
      break
    }
  }

  if (!curried) curried = curriedN(fn, arity)

  return (...args) => args.length >= arity ? fn(...args) : curried(...args)
}
