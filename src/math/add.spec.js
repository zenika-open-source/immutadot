/* eslint-env jest */
import add from './add'

describe('Add', () => {

  it('should add two numbers', () => {
    expect(add({ nested: { prop: 2 } }, 'nested.prop', 4)).toEqual({ nested: { prop: 6 } })
  })
})
