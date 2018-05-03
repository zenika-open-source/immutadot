/* eslint-env jest */
import { get } from 'core'
describe('core.get', () => {
  const obj = {
    nested1: { prop: 'val' },
    nested2: { arr: [{ val: 'arrVal' }] },
  }
  it('should get a prop', () => {
    expect(get(obj, 'nested1.prop')).toBe('val')
    expect(get(obj, 'nested1.prop.length')).toBe(3)
    expect(get(obj, 'nested2.arr.length')).toBe(1)
    expect(get(obj, 'nested2.arr[0].val')).toBe('arrVal')
  })
  it('should return undefined for unexisting path', () => {
    expect(get(obj, 'nested1.foo')).toBe(undefined)
    expect(get(obj, 'nested3.val')).toBe(undefined)
    expect(get(obj, 'nested2.arr[1].val')).toBe(undefined)
  })
  it('should return defaultValue for unexisting path', () => {
    expect(get(obj, 'nested1.foo', 'defaultValue')).toBe('defaultValue')
    expect(get(obj, 'nested3.val', 'defaultValue')).toBe('defaultValue')
    expect(get(obj, 'nested2.arr[1].val', 'defaultValue')).toBe('defaultValue')
  })
  it('should throw an error if path includes something else than props and indexes', () => {
    expect(() => get({}, 'foo[1:2]')).toThrowError('get supports only properties and array indexes in path')
  })

  it('should support currying the object', () => {
    expect(get('nested2.arr[0].val')(obj)).toBe('arrVal')
    expect(get('nested2.arr[1].val', 'defaultValue')(obj)).toBe('defaultValue')
  })
})
