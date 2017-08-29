/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { splice } from './splice'

describe('Splice', () => {

  it('should replace two elements', () => {
    immutaTest((input, path) => {
      const output = splice(input, path, 1, 2, 6, 6)
      expect(output).toEqual({ nested: { prop: [1, 6, 6, 4] } }) // 🍺
      return output
    }, { nested: { prop: [1, 2, 3, 4] } }, 'nested.prop')
  })
})
