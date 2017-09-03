/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { replace } from './replace'

describe('Replace', () => {

  it('should replace matches for pattern in string with replacement', () => {
    immutaTest((input, path) => {
      const output = replace(input, path, 'Nico', 'Yvo')
      expect(output).toEqual({ nested: { prop: 'Hi Yvo' } })
      return output
    }, { nested: { prop: 'Hi Nico' } }, 'nested.prop')
  })
})
