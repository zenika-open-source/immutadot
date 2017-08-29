/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pullAll } from './pullAll'

describe('PullAll', () => {

  it('should remove several matching elements', () => {
    immutaTest((input, path) => {
      const output = pullAll(input, path, [1, 3])
      expect(output).toEqual({ nested: { prop: [2, 2] } })
      return output
    }, { nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop')
  })
})
