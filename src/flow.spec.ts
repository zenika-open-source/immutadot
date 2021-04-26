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

    expect(flow`${o}.nested`(
      set`.property`('aze'),
      set`.otherProperty`('qwe'),
    )).toEqual({
      nested: {
        property: 'aze',
        otherProperty: 'qwe',
      },
    })
  })
})
