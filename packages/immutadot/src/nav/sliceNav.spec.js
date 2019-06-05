/* eslint-env jest */
import { immutaTest, toRefs } from 'test.utils'
import { sliceNav } from './sliceNav'

describe('SliceNav', () => {

  it('should update a slice', () => {
    const next = value => ({
      update: updater => updater(value),
    })
    const updater = value => value + 1

    const test = (params, expected) => immutaTest(
      [0, 1, 2, 3],
      expected.map((value, index) => value !== ([0, 1, 2, 3])[index] ? `${index}` : undefined).filter(index => index),
      input => {
        const output = sliceNav(params, next)(input).update(updater)
        expect(output).toEqual(expected)
        return output
      },
    )

    test([0, undefined], [1, 2, 3, 4])
    test([undefined, undefined], [1, 2, 3, 4])
    test([1, undefined], [0, 2, 3, 4])
    test([-2, undefined], [0, 1, 3, 4])
    test([undefined, 2], [1, 2, 2, 3])
    test([undefined, -1], [1, 2, 3, 3])
    test([undefined, undefined, 2], [1, 1, 3, 3])
    test([1, undefined, 2], [0, 2, 2, 4])
    test([undefined, undefined, -1], [1, 2, 3, 4])
    test([undefined, undefined, -2], [0, 2, 2, 4])
    test([-2, undefined, -2], [1, 1, 3, 3])
  })

  it('should unset a slice', () => {
    const next = () => ({
      final: true,
    })

    const test = (params, expected) => immutaTest(
      [0, 1, 2, 3],
      expected.map((value, index) => value !== ([0, 1, 2, 3])[index] ? `${index}` : undefined).filter(index => index),
      input => {
        const output = sliceNav(params, next)(input).unset()
        expect(output).toEqual(expected)
        return output
      },
    )

    test([0, undefined], [undefined, undefined, undefined, undefined])
    test([undefined, undefined], [undefined, undefined, undefined, undefined])
    test([1, undefined], [0, undefined, undefined, undefined])
    test([-2, undefined], [0, 1, undefined, undefined])
    test([undefined, 2], [undefined, undefined, 2, 3])
    test([undefined, -1], [undefined, undefined, undefined, 3])
    test([undefined, undefined, 2], [undefined, 1, undefined, 3])
    test([1, undefined, 2], [0, undefined, 2, undefined])
    test([undefined, undefined, -1], [undefined, undefined, undefined, undefined])
    test([undefined, undefined, -2], [0, undefined, 2, undefined])
    test([-2, undefined, -2], [undefined, 1, undefined, 3])
  })

  it('should get a slice', () => {
    const input = [0, 1, 2, 3]
    const inputRefs = toRefs(input)
    const next = value => ({
      get: () => value,
    })

    const test = (params, expected) => {
      expect(sliceNav(params, next)(input).get()).toEqual(expected)
      expect(input).toBeDeep(inputRefs)
    }

    test([0, undefined], [0, 1, 2, 3])
    test([undefined, undefined], [0, 1, 2, 3])
    test([1, undefined], [1, 2, 3])
    test([-2, undefined], [2, 3])
    test([undefined, 2], [0, 1])
    test([undefined, -1], [0, 1, 2])
    test([undefined, undefined, 2], [0, 2])
    test([1, undefined, 2], [1, 3])
    test([undefined, undefined, -1], [3, 2, 1, 0])
    test([undefined, undefined, -2], [3, 1])
    test([-2, undefined, -2], [2, 0])
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
