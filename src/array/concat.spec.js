/* eslint-env jest */
import { concat } from './concat'
import { immutaTest } from 'test.utils'

describe('Concat', () => {

  it('should concat an array', () => {
    immutaTest((input, path) => {
      const output = concat(input, path, [3, 4])
      expect(output).toEqual({ nested: { prop: [1, 2, 3, 4] } })
      return output
    }, { nested: { prop: [1, 2] } }, 'nested.prop')
  })

  it('should add several arrays', () => {
    immutaTest((input, path) => {
      const output = concat(input, path, [3, 4], [5, 6])
      expect(output).toEqual({ nested: { prop: [1, 2, 3, 4, 5, 6] } })
      return output
    }, { nested: { prop: [1, 2] } }, 'nested.prop')
  })

  it('should replace value with array', () => {
    immutaTest((input, path) => {
      const output = concat(input, path, [2, 3])
      expect(output).toEqual({ nested: { prop: [1, 2, 3] } })
      return output
    }, { nested: { prop: 1 } }, 'nested.prop')
  })
})
