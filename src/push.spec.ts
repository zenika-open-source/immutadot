import { recurFreeze } from '../recurFreeze'
import { push } from './push'

describe('Set', () => {
  it('should set a nested property (prop navigators only)', () => {
    const o = recurFreeze({
      nested: {
        array: [1, 2, 3],
        otherProperty: 'baz',
      },
    })

    expect(push`${o}.nested.array`(4, 5, 6)).toEqual({
      nested: {
        array: [1, 2, 3, 4, 5, 6],
        otherProperty: 'baz',
      },
    })
  })
})
