/* eslint-env node, mocha */
import toggle from './toggle'

describe('Toggle', () => {

  const withTrue = { nested: { prop: true } }
  const withFalse = { nested: { prop: false } }

  it('should toggle false to true', () => {
    toggle(withFalse, 'nested.prop').should.deep.equal(withTrue)
  })

  it('should toggle falsy to true', () => {
    toggle({ nested: {} }, 'nested.prop').should.deep.equal(withTrue)
    toggle({ nested: { prop: null } }, 'nested.prop').should.deep.equal(withTrue)
    toggle({ nested: { prop: '' } }, 'nested.prop').should.deep.equal(withTrue)
    toggle({ nested: { prop: 0 } }, 'nested.prop').should.deep.equal(withTrue)
  })

  it('should toggle deep undefined to true', () => {
    toggle({}, 'nested.prop').should.deep.equal(withTrue)
    toggle(undefined, 'nested.prop').should.deep.equal(withTrue)
  })

  it('should toggle true to false', () => {
    toggle(withTrue, 'nested.prop').should.deep.equal(withFalse)
  })

  it('should toggle truthy to false', () => {
    toggle({ nested: { prop: 'a' } }, 'nested.prop').should.deep.equal(withFalse)
    toggle({ nested: { prop: {} } }, 'nested.prop').should.deep.equal(withFalse)
    toggle({ nested: { prop: [] } }, 'nested.prop').should.deep.equal(withFalse)
    toggle({ nested: { prop: 1 } }, 'nested.prop').should.deep.equal(withFalse)
  })
})
