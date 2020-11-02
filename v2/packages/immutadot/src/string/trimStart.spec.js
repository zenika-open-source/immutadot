/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { trimStart } from 'string'

describe('string.trimStart', () => {
  it('should strip whitespaces at start', () => {
    immutaTest({ nested: { prop: '   Hello World !   ' } }, ['nested.prop'], (input, path) => {
      const output = trimStart(input, path)
      expect(output).toEqual({ nested: { prop: 'Hello World !   ' } })
      return output
    })
  })
})
