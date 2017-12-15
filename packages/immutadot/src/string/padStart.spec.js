/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { padStart } from 'string'

describe('string.padStart', () => {

  it('should add leading spaces', () => {
    immutaTest((input, path) => {
      const output = padStart(input, path, 10)
      expect(output).toEqual({ nested: { prop: '    Hellow' } })
      return output
    }, { nested: { prop: 'Hellow' } }, 'nested.prop')
  })

  it('should add leading question/exclamation marks', () => {
    immutaTest((input, path) => {
      const output = padStart(input, path, 10, '?!')
      expect(output).toEqual({ nested: { prop: '?!?!Hellow' } })
      return output
    }, { nested: { prop: 'Hellow' } }, 'nested.prop')
  })
})
