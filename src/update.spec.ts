import { recurFreeze } from '../recurFreeze'
import { update } from './update'

describe('update', () => {
  it('should update a nested prop', () => {
    const o = recurFreeze({
      nested: {
        property: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(update`${o}.nested.property`((v: any) => v.toUpperCase())).toEqual({
      nested: {
        property: 'FOO',
        otherProperty: 'baz',
      },
    })
  })
})
