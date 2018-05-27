/* eslint-env jest */
import {
  flow,
  set,
  unset,
  update,
} from 'core'
import { immutaTest } from 'test.utils'
import { push } from 'array'
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
  it('should update two different array indexes', () => {
    immutaTest({
      nested: { prop: [{ val: 1 }, { val: 2 }] },
      other: {},
    }, ['nested.prop.0.val', 'nested.prop.1.val', 'nested.prop.2'], input => {
      const output = flow(
        set('nested.prop[-2].val', 666),
        push('nested.prop', { val: 3 }),
        set('nested.prop[-2].val', 666),
      )(input)
      expect(output).toEqual({
        nested: { prop: [{ val: 666 }, { val: 666 }, { val: 3 }] },
        other: {},
      })
      return output
    })
  })
})
