/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { sortBy } from 'collection'
describe('SortBy', () => {
  it('should sort array by name and age', () => {
    immutaTest({
      nested: {
        prop: [{
          name: 'Yvo',
          age: 2,
        },
        {
          name: 'Nico',
          age: 666,
        },
        {
          name: 'Nico',
          age: 30,
        },
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = sortBy(input, path, [
        'name',
        'age',
      ])
      expect(output).toEqual({
        nested: {
          prop: [{
            name: 'Nico',
            age: 30,
          },
          {
            name: 'Nico',
            age: 666,
          },
          {
            name: 'Yvo',
            age: 2,
          },
          ],
        },
        other: {},
      })
      return output
    })
  })
})
