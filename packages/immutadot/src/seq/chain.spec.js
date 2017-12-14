/* eslint-env jest */
import { chain } from 'seq'
import { immutaTest } from 'test.utils'

describe('seq.chain', () => {

  const object = {
    nested1: {
      prop1: 'value1',
      prop2: 'value2',
    },
    nested2: {
      prop3: 'value3',
      prop4: 'value4',
    },
    other: {},
  }

  it('should apply modifications', () => {
    immutaTest((input, path1, path2, path3) => {
      const output = chain(input)
        .set(path1, 'value5')
        .update(path2, value => value.toUpperCase())
        .unset(path3)
        .value()
      expect(output).toEqual({
        nested1: {
          prop1: 'value1',
          prop2: 'value5',
        },
        nested2: { prop3: 'VALUE3' },
        other: {},
      })
      return output
    }, object, 'nested1.prop2', 'nested2.prop3', 'nested2.prop4')
  })

  it('should apply modifications at a path', () => {
    immutaTest(input => {
      const output = chain(input, 'nested1')
        .set('prop1', 'value5')
        .unset('prop2')
        .value()
      expect(output).toEqual({
        nested1: { prop1: 'value5' },
        nested2: {
          prop3: 'value3',
          prop4: 'value4',
        },
        other: {},
      })
      return output
    }, object, 'nested1.prop1', 'nested1.prop2')
  })

  it('should allow to peek in the middle of modifications', () => {
    immutaTest((input, path1, path2) => {
      const output = chain(input)
        .set(path1, 'value5')
        .peek(peeked => {
          expect(peeked).toEqual({
            nested1: {
              prop1: 'value1',
              prop2: 'value5',
            },
            nested2: {
              prop3: 'value3',
              prop4: 'value4',
            },
            other: {},
          })
        })
        .unset(path2)
        .value()
      expect(output).toEqual({
        nested1: {
          prop1: 'value1',
          prop2: 'value5',
        },
        nested2: { prop3: 'value3' },
        other: {},
      })
      return output
    }, object, 'nested1.prop2', 'nested2.prop4')
  })
})
