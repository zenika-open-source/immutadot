/* eslint-env jest */
import {
  set,
  unset,
  update,
} from 'core'
import { flow } from 'flow'
import { immutaTest } from 'test.utils'

describe('flow.flow', () => {
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
      const output = flow(
        set(path1, 'value5'),
        update(path2, value => value.toUpperCase()),
        unset(path3),
      )(input)
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

    immutaTest((input, path1, path2, path3) => {
      const output = flow([
        set(path1, 'value5'),
        update(path2, value => value.toUpperCase()),
        unset(path3),
      ])(input)
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

    immutaTest((input, path1, path2, path3) => {
      const output = flow(
        set(path1, 'value5'),
        [
          update(path2, value => value.toUpperCase()),
          unset(path3),
        ],
      )(input)
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
})
