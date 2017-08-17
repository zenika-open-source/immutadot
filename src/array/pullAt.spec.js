/* eslint-env jest */
import { pullAt } from './pullAt'

describe('PullAt', () => {

  it('should remove several elements', () => {
    expect(pullAt({ nested: { prop: [4, 3, 2, 1] } }, 'nested.prop', [1, 3])).toEqual({ nested: { prop: [4, 2] } })
  })
})
