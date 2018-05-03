/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { init } from 'object'
describe('object.init', () => {
  it('should initialize objects', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = init(path, 1)
      expect(output).toEqual({ nested: { prop: 1 } })
      return output
    })
  })
})
