/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { padEnd } from 'string'

describe('string.padEnd', () => {

  it('should add trailing spaces', () => {
    immutaTest((input, path) => {
      const output = padEnd(input, path, 10)
      expect(output).toEqual({ nested: { prop: 'Hellow    ' } })
      return output
    }, { nested: { prop: 'Hellow' } }, 'nested.prop')
  })

  it('should add trailing question/exclamation marks', () => {
    immutaTest((input, path) => {
      const output = padEnd(input, path, 10, '?!')
      expect(output).toEqual({ nested: { prop: 'Hellow?!?!' } })
      return output
    }, { nested: { prop: 'Hellow' } }, 'nested.prop')
  })
})
