import { recurFreeze } from '../recurFreeze'
import { flow } from './flow'
import { set } from './set'

describe('flow', () => {
  it('should set several paths', () => {
    const o = recurFreeze({
      nested: {
        property: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(flow(
      set`.nested.property`('aze'),
      set`.nested.otherProperty`('qwe'),
    )(o)).toEqual({
      nested: {
        property: 'aze',
        otherProperty: 'qwe',
      },
    })
  })
})
