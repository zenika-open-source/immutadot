/* eslint-env node, mocha */
import chain from './chain'

describe('Chain', () => {

  const object = {
    nested1: {
      prop1: 'value1',
      prop2: 'value2',
    },
    nested2: {
      prop3: 'value3',
      prop4: 'value4',
    },
  }

  it('should apply modifications', () => {
    chain(object)
      .set('nested1.prop2', 'value5')
      .update('nested2.prop3', value => value.toUpperCase())
      .unset('nested2.prop4')
      .value()
      .should.deep.equal({
        nested1: {
          prop1: 'value1',
          prop2: 'value5',
        },
        nested2: { prop3: 'VALUE3' },
      })
  })

  it('should apply modifications at a path', () => {
    chain(object, 'nested1')
      .set('prop1', 'value5')
      .unset('prop2')
      .value()
      .should.deep.equal({
        nested1: { prop1: 'value5' },
        nested2: {
          prop3: 'value3',
          prop4: 'value4',
        },
      })
  })
})
