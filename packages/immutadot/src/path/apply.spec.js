/* eslint-env jest */
import { apply } from './apply'
import { immutaTest } from 'test.utils'

describe('path.apply', () => {

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

  it('should inc in a list of props', () => {
    immutaTest(
      input => {
        const output = inc(input, 'nested.{prop1,prop2,"prop{3}",\'"prop4"\'}.val')
        expect(output).toEqual({
          nested: {
            'prop1': { val: 1 },
            'prop2': { val: 6 },
            'prop{3}': { val: 6 },
            '"prop4"': { val: 4 },
          },
          other: {},
        })
        return output
      },
      {
        nested: {
          'prop1': { val: 0 },
          'prop2': { val: 5 },
          'prop{3}': { val: 5 },
          '"prop4"': { val: 3 },
        },
        other: {},
      },
      'nested.prop1.val',
      'nested.prop2.val',
      'nested.prop{3}.val',
      'nested."prop4".val',
    )
  })

  it('should inc in all props', () => {
    immutaTest(
      input => {
        const output = inc(input, 'nested.{*}.val')
        expect(output).toEqual({
          nested: {
            'prop1': { val: 1 },
            'prop2': { val: 6 },
            'prop{3}': { val: 6 },
            '"prop4"': { val: 4 },
          },
          other: {},
        })
        return output
      },
      {
        nested: {
          'prop1': { val: 0 },
          'prop2': { val: 5 },
          'prop{3}': { val: 5 },
          '"prop4"': { val: 3 },
        },
        other: {},
      },
      'nested.prop1.val',
      'nested.prop2.val',
      'nested.prop{3}.val',
      'nested."prop4".val',
    )
  })

  it('should throw an explicit error when en empty path is given as parameter', () => {
    expect(() => inc({}, '')).toThrowError('path should not be empty')
  })

  it('should support curried first arg', () => {
    immutaTest(
      (input, path) => {
        const output = inc(path)(input, { shouldBeDiscarded: true })
        expect(output).toEqual({
          nested: { prop: 6 },
          other: {},
        })
        return output
      },
      {
        nested: { prop: 5 },
        other: {},
      },
      'nested.prop',
    )
  })
})
