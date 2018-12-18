/* eslint-env jest */
import { BenchmarkSuite } from './benchmark'
import { setDeepProp } from './setDeepProp'
import { setProp } from './setProp'
import { updateTodos } from './updateTodos'

const benchmarkSuite = new BenchmarkSuite(
  'es2015',
  [
    ['es2015', 'ES2015 destructuring'],
    ['immutable', 'immutable 4.0.0-rc.12'],
    ['seamless', 'seamless-immutable 7.1.3'],
    ['immer', 'immer 1.8.0'],
    ['qim', 'qim 0.0.52'],
    ['immutadot', 'immutad●t 2.0.0'],
    ['qim-curried', 'qim 0.0.52 curried'],
    ['immutadot-curried', 'immutad●t 2.0.0 curried'],
  ],
)

describe('Benchmark suite', () => {
  describe('Set a property', () => setProp(benchmarkSuite))
  describe('Set a deeply nested property', () => setDeepProp(benchmarkSuite))
  // describe('Update small todos list', () => updateTodos(benchmarkSuite, 'Update small todos list (1000 items)', 1000, 100, 30, 50000))
  // describe('Update medium todos list', () => updateTodos(benchmarkSuite, 'Update medium todos list (10000 items)', 10000, 1000, 30, 5000))
  // describe('Update large todos list', () => updateTodos(benchmarkSuite, 'Update large todos list (100000 items)', 100000, 10000, 30, 500))

  afterAll(() => benchmarkSuite.log())
})
