/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { trimEnd } from 'string'

describe('string.trimEnd', () => {
  it('should strip whitespaces at end', () => {
    immutaTest({ nested: { prop: '   Hello World !   ' } }, ['nested.prop'], (input, path) => {
      const output = trimEnd(input, path)
      expect(output).toEqual({ nested: { prop: '   Hello World !' } })
      return output
    })
  })
})
