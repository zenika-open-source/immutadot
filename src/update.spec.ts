import { expect, describe, it } from 'vitest'

import { recurFreeze } from '../recurFreeze'
import { update } from './update'

describe('update', () => {
  const o = recurFreeze({
    nested: {
      property: 'foo',
      otherProperty: 'baz',
    },
  })

  it('should update a nested prop', () => {
    expect(update`${o}.nested.property`((v: any) => v.toUpperCase())).toEqual({
      nested: {
        property: 'FOO',
        otherProperty: 'baz',
      },
    })
  })

  it('should forward additional arguments to updater', () => {
    expect(update`${o}.nested.property`((...args) => args.join(''), 'o', 'o', 'o')).toEqual({
      nested: {
        property: 'fooooo',
        otherProperty: 'baz',
      },
    })
  })
})
