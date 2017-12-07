/* eslint-env jest */
import { apply } from './apply'
import { immutaTest } from 'test.utils'

describe('Apply', () => {

  const _inc = (v, i = 1) => {
    let r = Number(v)
    if (Number.isNaN(r)) r = 0
    return r + i
  }

  const incOperation = (obj, prop, value, ...args) => { obj[prop] = _inc(obj[prop], ...args) }

  const inc = apply(incOperation)

  it('should inc in an array slice', () => {
    immutaTest(
      input => {
        const output = inc(input, 'nested.prop[:].val', 2)
        expect(output).toEqual({
          nested: {
            prop: [
              {
                val: 6,
                other: {},
              },
              { val: -6 },
              { val: 2 },
              { val: 2 },
            ],
          },
        })
        return output
      },
      {
        nested: {
          prop: [
            {
              val: 4,
              other: {},
            },
            { val: -8 },
            { val: 'a' },
            {},
          ],
        },
      },
      'nested.prop.0.val',
      'nested.prop.1.val',
      'nested.prop.2.val',
      'nested.prop.3.val',
    )

    immutaTest(
      input => {
        const output = inc(input, 'nested.prop[1:3].val')
        expect(output).toEqual({
          nested: {
            prop: [{ val: 0 }, {
              val: 2,
              other: {},
            }, { val: 3 }, { val: 3 }],
          },
          other: {},
        })
        return output
      },
      {
        nested: {
          prop: [{ val: 0 }, {
            val: 1,
            other: {},
          }, { val: 2 }, { val: 3 }],
        },
        other: {},
      },
      'nested.prop.1.val',
      'nested.prop.2.val',
    )

    immutaTest(
      input => {
        const output = inc(input, 'nested.prop[-3:-1].val')
        expect(output).toEqual({
          nested: {
            prop: [{ val: 0 }, {
              val: 2,
              other: {},
            }, { val: 3 }, { val: 3 }],
          },
          other: {},
        })
        return output
      },
      {
        nested: {
          prop: [{ val: 0 }, {
            val: 1,
            other: {},
          }, { val: 2 }, { val: 3 }],
        },
        other: {},
      },
      'nested.prop.1.val',
      'nested.prop.2.val',
    )

    immutaTest(
      input => {
        const output = inc(input, 'nested.prop[3:5].val', 6)
        expect(output).toEqual({
          nested: { prop: [{ val: 0 }, { val: 1 }, undefined, { val: 6 }, { val: 6 }] },
          other: {},
        })
        return output
      },
      {
        nested: { prop: [{ val: 0 }, { val: 1 }] },
        other: {},
      },
      'nested.prop.2',
      'nested.prop.3.val',
      'nested.prop.4.val',
    )
  })

  it('should avoid unnecessary copies with slice operator', () => {
    immutaTest(
      input => inc(input, 'nested.prop[0:0].val', 6),
      {
        nested: { prop: [{ val: 0 }, { val: 1 }] },
        other: {},
      },
    )

    immutaTest(
      input => inc(input, 'nested.prop[:].arr[0:0].val', 6),
      {
        nested: { prop: [{ arr: [{ val: 0 }, { val: 1 }] }, { arr: [{ val: 2 }] }] },
        other: {},
      },
    )

    immutaTest(
      input => {
        const output = inc(input, 'nested.prop[:].arr[1:].val', 6)
        expect(output).toEqual({
          nested: { prop: [{ arr: [{ val: 0 }, { val: 7 }] }, { arr: [{ val: 2 }] }] },
          other: {},
        })
        return output
      },
      {
        nested: { prop: [{ arr: [{ val: 0 }, { val: 1 }] }, { arr: [{ val: 2 }] }] },
        other: {},
      },
      'nested.prop.0.arr.1.val',
    )
  })

  it('should throw an explicit error when en empty path is given as parameter', () => {
    expect(() => inc({}, '')).toThrowError('path should not be empty')
  })
})
