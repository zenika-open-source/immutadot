/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { unionBy } from './unionBy'

describe('UnionBy', () => {

  it('should create a set of unique values', () => {
    immutaTest((input, path) => {
      const output = unionBy(input, path, [{ x: 2 }, { x: 3 }], 'x')
      expect(output).toEqual({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }] } })
      return output
    }, { nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop')
  })
})
