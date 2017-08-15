/* eslint-env jest */
import { toggle } from './toggle'

describe('Toggle', () => {

  const withTrue = { nested: { prop: true } }
  const withFalse = { nested: { prop: false } }

  it('should toggle false to true', () => {
    expect(toggle(withFalse, 'nested.prop')).toEqual(withTrue)
  })

  it('should toggle falsy to true', () => {
    expect(toggle({ nested: {} }, 'nested.prop')).toEqual(withTrue)
    expect(toggle({ nested: { prop: null } }, 'nested.prop')).toEqual(withTrue)
    expect(toggle({ nested: { prop: '' } }, 'nested.prop')).toEqual(withTrue)
    expect(toggle({ nested: { prop: 0 } }, 'nested.prop')).toEqual(withTrue)
  })

  it('should toggle deep undefined to true', () => {
    expect(toggle({}, 'nested.prop')).toEqual(withTrue)
    expect(toggle(undefined, 'nested.prop')).toEqual(withTrue)
  })

  it('should toggle true to false', () => {
    expect(toggle(withTrue, 'nested.prop')).toEqual(withFalse)
  })

  it('should toggle truthy to false', () => {
    expect(toggle({ nested: { prop: 'a' } }, 'nested.prop')).toEqual(withFalse)
    expect(toggle({ nested: { prop: {} } }, 'nested.prop')).toEqual(withFalse)
    expect(toggle({ nested: { prop: [] } }, 'nested.prop')).toEqual(withFalse)
    expect(toggle({ nested: { prop: 1 } }, 'nested.prop')).toEqual(withFalse)
  })
})
