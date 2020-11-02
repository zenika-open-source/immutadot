/* eslint-env jest */
import { add } from 'lang'
import { immutaTest } from 'test.utils'
describe('lang.add', () => {
  it('should add two numbers', () => {
    immutaTest({
      nested: { prop: 2 },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = add(input, path, 4)
      expect(output).toEqual({
        nested: { prop: 6 },
        other: {},
      })
      return output
    })
  })
})
