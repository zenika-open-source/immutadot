/* eslint-env jest */
import { curry } from './curry'

describe('curry.curry', () => {
  function fill(obj, path, value, start = 0, end = -1) {
    return `fill(${obj}, ${path}, ${value}, ${start}, ${end})`
  }
  const curriedFill = curry(fill, 3, 5)

  it('should allow non curried calls', () => {
    expect(curriedFill('obj', 'path', 'value')).toBe('fill(obj, path, value, 0, -1)')
    expect(curriedFill('obj', 'path', 'value', 1)).toBe('fill(obj, path, value, 1, -1)')
    expect(curriedFill('obj', 'path', 'value', 1, 2)).toBe('fill(obj, path, value, 1, 2)')
  })

  it('should allow all sorts of curried calls', () => {
    expect(curriedFill('path', 'value')('obj')).toBe('fill(obj, path, value, 0, -1)')
    expect(curriedFill('path')('value')('obj')).toBe('fill(obj, path, value, 0, -1)')
    expect(curriedFill('path')('value', 1)('obj')).toBe('fill(obj, path, value, 1, -1)')
    expect(curriedFill('path', 'value')(1, 'obj')).toBe('fill(obj, path, value, 1, -1)')
    expect(curriedFill('path')('value')(1, 'obj')).toBe('fill(obj, path, value, 1, -1)')
    expect(curriedFill('path')('value', 1, 2)('obj')).toBe('fill(obj, path, value, 1, 2)')
    expect(curriedFill('path')('value', 1, 2, 'obj')).toBe('fill(obj, path, value, 1, 2)')
    expect(curriedFill('path', 'value')(1, 2, 'obj')).toBe('fill(obj, path, value, 1, 2)')
    expect(curriedFill('path')('value', 1)(2, 'obj')).toBe('fill(obj, path, value, 1, 2)')
    expect(curriedFill('path')('value')(1, 2, 'obj')).toBe('fill(obj, path, value, 1, 2)')
  })
})
