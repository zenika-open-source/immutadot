/* eslint-env jest */
import { dropRight } from './dropRight'
import { immutaTest } from 'test.utils'

describe('DropRight', () => {

  it('should drop several elements at the end of the array', () => {
    immutaTest((input, path) => {
      const output = dropRight(input, path, 2)
      expect(output).toEqual({ nested: { prop: [1, 2] } })
      return output
    }, { nested: { prop: [1, 2, 3, 4] } }, 'nested.prop')
  })
})
