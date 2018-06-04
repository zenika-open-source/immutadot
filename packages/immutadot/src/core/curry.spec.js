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
})
