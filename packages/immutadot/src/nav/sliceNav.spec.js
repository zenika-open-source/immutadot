/* eslint-env jest */
import { immutaTest } from 'test.utils'
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

  it('should avoid unnecessary copies', () => {
    const input = [
      { val: 0 },
      { val: 1 },
    ]
    const next = value => ({
      update: updater => updater(value),
    })
    const updater = value => ({
      ...value,
      val: value.val + 1,
    })

    const test = params => immutaTest(input, [], () => sliceNav(params, next)(input).update(updater))

    test([0, 0])
    test([1, 1])
    test([1, 0])
    test([2, undefined])
    test([undefined, 0])
    test([undefined, -2])
  })
})
