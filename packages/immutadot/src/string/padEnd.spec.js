/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { padEnd } from 'string'
describe('string.padEnd', () => {
  it('should add trailing spaces', () => {
    immutaTest({ nested: { prop: 'Hellow' } }, ['nested.prop'], (input, path) => {
      const output = padEnd(input, path, 10)
      expect(output).toEqual({ nested: { prop: 'Hellow    ' } })
      return output
    })
  })
  it('should add trailing question/exclamation marks', () => {
    immutaTest({ nested: { prop: 'Hellow' } }, ['nested.prop'], (input, path) => {
      const output = padEnd(input, path, 10, '?!')
      expect(output).toEqual({ nested: { prop: 'Hellow?!?!' } })
      return output
    })
  })
})
