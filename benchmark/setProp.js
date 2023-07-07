import { BenchmarkJob, Column } from 'benchmark-node'
import * as qim from 'qim'
import * as immer from 'immer'
import * as immutadot2 from 'immutadot2/core/index.js'
import * as immutadot3 from 'immutadot3/dist/immutadot.js'
import * as immutadot3Dev from '../dist/immutadot.js'

immer.setAutoFreeze(false)

const baseState = {
  nested: {
    prop: 'foo',
    otherProp: 'aze',
  },
  other: { prop: 'baz' },
}

new BenchmarkJob({
  columns: [Column.Ops],
})
  .add('vanilla', () => {
    return {
      ...baseState,
      nested: {
        ...baseState.nested,
        prop: 'bar',
      },
    }
  })
  .add('qim', () => {
    return qim.set(['nested', 'prop'], 'bar', baseState)
  })
  .add('immer', () => {
    return immer.produce(baseState, (draft) => {
      draft.nested.prop = 'bar'
    })
  })
  .add('immutadot2', () => {
    return immutadot2.set(baseState, 'nested.prop', 'bar')
  })
  .add('immutadot3', () => {
    return immutadot3.set`${baseState}.nested.prop`('bar')
  })
  .add('immutadot3 dev', () => {
    return immutadot3Dev.set`${baseState}.nested.prop`('bar')
  })
  .run()
