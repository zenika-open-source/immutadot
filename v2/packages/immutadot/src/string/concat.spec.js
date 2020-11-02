/* eslint-env jest */
import { concat } from 'string'
import { immutaTest } from 'test.utils'
describe('string.concat', () => {
  it('should concat strings', () => {
    immutaTest({ nested: { prop: 'Hello' } }, ['nested.prop'], (input, path) => {
      const output = concat(input, path, ' world', ' !')
      expect(output).toEqual({ nested: { prop: 'Hello world !' } })
      return output
    })
  })
})
