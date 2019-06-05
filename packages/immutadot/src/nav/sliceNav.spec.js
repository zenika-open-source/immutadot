/* eslint-env jest */
import { sliceNav } from './sliceNav'

describe('SliceNav', () => {

  it('should update a slice', () => {
    const input = [0, 1]
    const next = value => ({
      update: updater => updater(value),
    })
    const updater = value => value + 1

    const test = (params, expected) => {
      const output = sliceNav(params, next)(input).update(updater)

      expect(input).toEqual([0, 1])
      expect(output).not.toBe(input)
      expect(output).toEqual(expected)
    }

    test([0, undefined], [1, 2])
  })
})
