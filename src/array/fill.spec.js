/* eslint-env jest */
import { fill } from './fill'

describe('Fill', () => {

  it('should fill array with 6 from 1 to 3 excluded', () => {
    expect(fill({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 6, 1, 3)).toEqual({ nested: { prop: [1, 6, 6, 4] } }) // 🍺
  })
})
