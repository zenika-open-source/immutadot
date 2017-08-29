/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pullAt } from './pullAt'

describe('PullAt', () => {

  it('should remove several elements', () => {
    immutaTest((input, path) => {
      const output = pullAt(input, path, [1, 3])
      expect(output).toEqual({ nested: { prop: [4, 2] } })
      return output
    }, { nested: { prop: [4, 3, 2, 1] } }, 'nested.prop')
  })
})
