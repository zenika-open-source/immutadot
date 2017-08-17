/* eslint-env jest */
import { dropRight } from './dropRight'

describe('DropRight', () => {

  it('should drop several elements at the end of the array', () => {
    expect(dropRight({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2)).toEqual({ nested: { prop: [1, 2] } })
  })
})
