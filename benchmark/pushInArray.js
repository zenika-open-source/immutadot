import { BenchmarkJob, Column } from 'benchmark-node'
import * as qim from 'qim'
import * as immer from 'immer'
import * as immutadot2 from 'immutadot2/array/index.js'
import * as immutadot3 from 'immutadot3/dist/immutadot.js'
import * as immutadot3Dev from '../dist/immutadot.js'

immer.setAutoFreeze(false)

const baseState = {
  nested: {
    prop: [1, 2, 3],
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
        prop: [...baseState.nested.prop, 4, 5, 6],
      },
    }
  })
  .add('qim', () => {
    return qim.set(['nested', 'prop', qim.$end], [4, 5, 6], baseState)
  })
  .add('immer', () => {
    return immer.produce(baseState, (draft) => {
      draft.nested.prop.push(4, 5, 6)
    })
  })
  .add('immutadot2', () => {
    return immutadot2.push(baseState, 'nested.prop', 4, 5, 6)
  })
  .add('immutadot3', () => {
    return immutadot3.push`${baseState}.nested.prop`(4, 5, 6)
  })
  .add('immutadot3 dev', () => {
    return immutadot3Dev.push`${baseState}.nested.prop`(4, 5, 6)
  })
  .run()
