/* eslint-env jest */
import { curry } from './curry'

describe('curry.curry', () => {
  function fill(obj, path, value, start = 0, end = -1, extraArg) {
    return `fill(${obj}, ${path}, ${value}, ${start}, ${end}, ${extraArg})`
  }
  const curriedFill = curry(fill)

  it('should allow non curried calls', () => {
    expect(curriedFill('obj', 'path', 'value')).toBe('fill(obj, path, value, 0, -1, undefined)')
    expect(curriedFill('obj', 'path', 'value', 1)).toBe('fill(obj, path, value, 1, -1, undefined)')
    expect(curriedFill('obj', 'path', 'value', 1, 2)).toBe('fill(obj, path, value, 1, 2, undefined)')
    expect(curriedFill('obj', 'path', 'value', 1, 2, 'extraArg')).toBe('fill(obj, path, value, 1, 2, extraArg)')
  })

  it('should allow all sorts of curried calls', () => {
    expect(curriedFill('path', 'value')('obj')).toBe('fill(obj, path, value, 0, -1, undefined)')
    expect(curriedFill('path')('value')('obj')).toBe('fill(obj, path, value, 0, -1, undefined)')
    expect(curriedFill('path')('value', 1)('obj')).toBe('fill(obj, path, value, 1, -1, undefined)')
    expect(curriedFill('path')('value', 1, 2)('obj')).toBe('fill(obj, path, value, 1, 2, undefined)')
    expect(curriedFill('path')('value', 1, 2, 'extraArg')('obj')).toBe('fill(obj, path, value, 1, 2, extraArg)')
  })

  it('should discard extra args in last curried call', () => {
    expect(curriedFill('path', 'value')('obj', 'extraArg')).toBe('fill(obj, path, value, 0, -1, undefined)')
  })

  it('should allow reusing partial calls', () => {
    const partial1 = curriedFill('path')
    const partial2 = partial1('value1')
    const partial3 = partial1('value2')

    expect(partial2('obj1')).toBe('fill(obj1, path, value1, 0, -1, undefined)')
    expect(partial2('obj2')).toBe('fill(obj2, path, value1, 0, -1, undefined)')
    expect(partial3('obj1')).toBe('fill(obj1, path, value2, 0, -1, undefined)')
    expect(partial3('obj2')).toBe('fill(obj2, path, value2, 0, -1, undefined)')
  })

  it('should manage fixedArity', () => {
    function printArgs(...args) {
      return args.map((arg, i) => `arg${i} = ${arg}`).join(', ')
    }

    const printArgs2 = curry(printArgs, 2, true)
    expect(printArgs2(1)(2)).toBe('arg0 = 2, arg1 = 1')

    const printArgs3 = curry(printArgs, 3, true)
    expect(printArgs3(1, 2)(3)).toBe('arg0 = 3, arg1 = 1, arg2 = 2')
    expect(printArgs3(1)(2, 3)).toBe('arg0 = 3, arg1 = 1, arg2 = 2')
    expect(printArgs3(1)(2)(3)).toBe('arg0 = 3, arg1 = 1, arg2 = 2')

    const printArgs4 = curry(printArgs, 4, true)
    expect(printArgs4(1, 2, 3)(4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')
    expect(printArgs4(1, 2)(3, 4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')
    expect(printArgs4(1, 2)(3)(4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')
    expect(printArgs4(1)(2, 3, 4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')
    expect(printArgs4(1)(2, 3)(4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')
    expect(printArgs4(1)(2)(3, 4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')
    expect(printArgs4(1)(2)(3)(4)).toBe('arg0 = 4, arg1 = 1, arg2 = 2, arg3 = 3')

    const printArgs5 = curry(printArgs, 5, true)
    expect(printArgs5(1, 2, 3, 4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1, 2, 3)(4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1, 2, 3)(4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1, 2)(3, 4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1, 2)(3, 4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1, 2)(3)(4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1, 2)(3)(4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2, 3, 4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2, 3, 4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2, 3)(4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2, 3)(4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2)(3, 4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2)(3, 4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2)(3)(4, 5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
    expect(printArgs5(1)(2)(3)(4)(5)).toBe('arg0 = 5, arg1 = 1, arg2 = 2, arg3 = 3, arg4 = 4')
  })
})
