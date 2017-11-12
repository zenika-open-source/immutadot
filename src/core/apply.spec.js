/* eslint-env jest */
import { apply } from './apply'
import { immutaTest } from 'test.utils'

describe('Apply', () => {

  const _inc = (v, i = 1) => {
    let r = Number(v)
    if (Number.isNaN(r)) r = 0
    return r + i
  }

  const inc = (obj, path, ...args) => apply(obj, path, (obj, prop) => { obj[prop] = _inc(obj[prop], ...args) })

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
  })

})
