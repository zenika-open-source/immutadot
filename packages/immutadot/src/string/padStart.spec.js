/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { padStart } from 'string'
describe('string.padStart', () => {
  it('should add leading spaces', () => {
    immutaTest({ nested: { prop: 'Hellow' } }, ['nested.prop'], (input, path) => {
      const output = padStart(input, path, 10)
      expect(output).toEqual({ nested: { prop: '    Hellow' } })
      return output
    })
  })
  it('should add leading question/exclamation marks', () => {
    immutaTest({ nested: { prop: 'Hellow' } }, ['nested.prop'], (input, path) => {
      const output = padStart(input, path, 10, '?!')
      expect(output).toEqual({ nested: { prop: '?!?!Hellow' } })
      return output
    })
  })
})
