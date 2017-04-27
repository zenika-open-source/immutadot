/* eslint-env node, mocha */
import { expect } from 'chai'
import toggle from './toggle'

describe('Toggle', () => {

  const withTrue = { nested: { prop: true } }
  const withFalse = { nested: { prop: false } }

  it('should toggle false to true', () => {
    expect(toggle(withFalse, 'nested.prop')).to.be.deep.equal(withTrue)
  })

  it('should toggle falsy to true', () => {
    expect(toggle({ nested: {} }, 'nested.prop')).to.be.deep.equal(withTrue)
    expect(toggle({ nested: { prop: null } }, 'nested.prop')).to.be.deep.equal(withTrue)
    expect(toggle({ nested: { prop: '' } }, 'nested.prop')).to.be.deep.equal(withTrue)
    expect(toggle({ nested: { prop: 0 } }, 'nested.prop')).to.be.deep.equal(withTrue)
  })

  it('should toggle deep undefined to true', () => {
    expect(toggle({}, 'nested.prop')).to.be.deep.equal(withTrue)
    expect(toggle(undefined, 'nested.prop')).to.be.deep.equal(withTrue)
  })

  it('should toggle true to false', () => {
    expect(toggle(withTrue, 'nested.prop')).to.be.deep.equal(withFalse)
  })

  it('should toggle truthy to false', () => {
    expect(toggle({ nested: { prop: 'a' } }, 'nested.prop')).to.be.deep.equal(withFalse)
    expect(toggle({ nested: { prop: {} } }, 'nested.prop')).to.be.deep.equal(withFalse)
    expect(toggle({ nested: { prop: [] } }, 'nested.prop')).to.be.deep.equal(withFalse)
    expect(toggle({ nested: { prop: 1 } }, 'nested.prop')).to.be.deep.equal(withFalse)
  })
})
