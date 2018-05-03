/* eslint-env jest */
import {
  flow,
  set,
  unset,
  update,
} from 'core'
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
    immutaTest(object, [
      'nested1.prop2',
      'nested2.prop3',
      'nested2.prop4',
    ], (input, [path1, path2, path3]) => {
      const output = flow(set(path1, 'value5'), update(path2, value => value.toUpperCase()), unset(path3))(input)
      expect(output).toEqual({
        nested1: {
          prop1: 'value1',
          prop2: 'value5',
        },
        nested2: { prop3: 'VALUE3' },
        other: {},
      })
      return output
    })
    immutaTest(object, [
      'nested1.prop2',
      'nested2.prop3',
      'nested2.prop4',
    ], (input, [path1, path2, path3]) => {
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
    })
    immutaTest(object, [
      'nested1.prop2',
      'nested2.prop3',
      'nested2.prop4',
    ], (input, [path1, path2, path3]) => {
      const output = flow(set(path1, 'value5'), [
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
    })
  })
  it('should skip non functions', () => {
    immutaTest({
      nested: { prop: 'foo' },
      other: {},
    }, ['nested.prop'], (input, [path]) => {
      const output = flow(null, set(path, 'bar'), undefined, false, [
        null,
        undefined,
        false,
      ])(input)
      expect(output).toEqual({
        nested: { prop: 'bar' },
        other: {},
      })
      return output
    })
  })
  it('should do nothing if empty flow', () => {
    const input = {
      nested: { prop: 'foo' },
      other: {},
    }
    const output = flow()(input)
    expect(output).toBe(input)
  })
  it('should accept non immutadot functions', () => {
    expect(flow(obj => ({
      ...obj,
      nested: {
        ...obj.nested,
        prop: 'bar',
      },
    }))({
      nested: { prop: 'foo' },
      other: {},
    })).toEqual({
      nested: { prop: 'bar' },
      other: {},
    })
  })
})
