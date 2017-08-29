/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { without } from './without'

describe('Without', () => {

  it('should remove several matching elements', () => {
    immutaTest((input, path) => {
      const output = without(input, path, 1, 3)
      expect(output).toEqual({
        nested: { prop: [2, 2] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 1, 2, 3] },
      other: {},
    }, 'nested.prop')
  })
})
