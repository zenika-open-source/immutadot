/* eslint-env jest */
import { get } from 'core'

describe('Get', () => {
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
})
