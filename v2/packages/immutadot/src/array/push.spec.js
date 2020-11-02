/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { push } from 'array'
describe('array.push', () => {
  it('should add one element', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = push(input, path, 3)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
            3,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should add several elements', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = push(input, path, 3, 4)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
            3,
            4,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = push(input, path, 1)
      expect(output).toEqual({ nested: { prop: [1] } })
      return output
    })
  })
  it('should wrap value in an array', () => {
    immutaTest({ nested: { prop: 1 } }, ['nested.prop'], (input, path) => {
      const output = push(input, path, 2)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
          ],
        },
      })
      return output
    })
  })
})
