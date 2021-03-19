/* eslint-env jest */
import { get } from 'core'
describe('core.get', () => {
  const obj = {
    nested1: { prop: 'val' },
    nested2: { arr: [{ val: 'arrVal1' }, { val: 'arrVal2' }] },
    nested3: [[{ val: 1 }, { val: 2 }], [{ val: 3 }, { val: 4 }]],
  }

  it('should get a prop', () => {
    expect(get(obj, 'nested1.prop')).toBe('val')
    expect(get(obj, 'nested1.prop.length')).toBe(3)
    expect(get(obj, 'nested2.arr.length')).toBe(2)
    expect(get(obj, 'nested2.arr[0].val')).toBe('arrVal1')
  })

  it('should get slices of nested props', () => {
    expect(get(obj, 'nested2.arr[:].val')).toEqual(['arrVal1', 'arrVal2'])
    expect(get(obj, 'nested3[:][:].val')).toEqual([[1, 2], [3, 4]])
  })

  it('should return undefined for unexisting path', () => {
    expect(get(obj, 'nested1.foo')).toBe(undefined)
    expect(get(obj, 'nested3.val')).toBe(undefined)
    expect(get(obj, 'nested2.arr[2].val')).toBe(undefined)
  })

  it('should support currying the object', () => {
    expect(get('nested2.arr[0].val')(obj)).toBe('arrVal1')
  })
})
