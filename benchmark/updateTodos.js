import { BenchmarkJob, Column, Params } from 'benchmark-node'
import * as qim from 'qim'
import * as immer from 'immer'
import * as immutadot2 from 'immutadot2/core/index.js'
import * as immutadot3 from 'immutadot3/dist/immutadot.js'
import * as immutadot3Dev from '../dist/immutadot.js'

immer.setAutoFreeze(false)

let baseState, start, end

new BenchmarkJob({
  columns: [Column.Ops],
})
  .setSetup(
    (listSize) => {
      baseState = []
      for (let i = 0; i < listSize; i++) {
        baseState.push({
          todo: `todo_${i}`,
          done: false,
          someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        })
      }
      start = listSize * 0.3
      end = listSize * 0.4
    },
    [new Params(1000, 10000, 100000)],
  )
  .add('vanilla', () => {
    const stateCopy = [...baseState]
    for (let i = start; i < end; i++) {
      stateCopy[i] = {
        ...stateCopy[i],
        done: true,
      }
    }
    return stateCopy
  })
  .add('qim', () => {
    return qim.set([qim.$slice(start, end), qim.$each, 'done'], true, baseState)
  })
  .add('immer', () => {
    return immer.produce(baseState, (draft) => {
      for (let i = start; i < end; i++) draft[i].done = true
    })
  })
  .add('immutadot2', () => {
    return immutadot2.set(baseState, `[${start}:${end}].done`, true)
  })
  .add('immutadot3', () => {
    return immutadot3.set`${baseState}[${start}:${end}].done`(true)
  })
  .add('immutadot3 dev', () => {
    return immutadot3Dev.set`${baseState}[${start}:${end}].done`(true)
  })
  .run()
