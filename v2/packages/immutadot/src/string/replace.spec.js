/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { replace } from 'string'
describe('string.replace', () => {
  it('should replace matches for pattern in string with replacement', () => {
    immutaTest({ nested: { prop: 'Hi Nico' } }, ['nested.prop'], (input, path) => {
      const output = replace(input, path, 'Nico', 'Yvo')
      expect(output).toEqual({ nested: { prop: 'Hi Yvo' } })
      return output
    })
  })
})
