/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { unset } from 'core'

describe('core.unset', () => {

  it('should unset a prop', () => {
    immutaTest({
      nested: { prop: 'initial' },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = unset(input, path)
      expect(output).toEqual({
        nested: {},
        other: {},
      })
      return output
    })
  })

  it('should unset an index', () => {
    immutaTest({
      nested: { arr: [1, 2, 3] },
      other: {},
    }, ['nested.arr.1'], input => {
      const output = unset(input, 'nested.arr[1]')
      expect(output).toEqual({
        nested: { arr: [1, , 3] }, // eslint-disable-line no-sparse-arrays
        other: {},
      })
      return output
    })
  })

  it('should unset several props', () => {
    immutaTest({
      nested: {
        prop1: 'initial1',
        prop2: 'initial2',
      },
      other: {},
    }, ['nested.prop1', 'nested.prop2'], input => {
      const output = unset(input, 'nested.{prop1,prop2}')
      expect(output).toEqual({
        nested: {},
        other: {},
      })
      return output
    })
  })

  it('should unset a slice', () => {
    immutaTest({
      nested: { arr: [1, 2, 3, 4] },
      other: {},
    }, ['nested.arr.1', 'nested.arr.2'], input => {
      const output = unset(input, 'nested.arr[1:3]')
      expect(output).toEqual({
        nested: { arr: [1, , , 4] }, // eslint-disable-line no-sparse-arrays
        other: {},
      })
      return output
    })
  })
})
