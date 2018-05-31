/* eslint-env jest */
import { BenchmarkSuite } from './benchmark'
import { updateTodos } from './updateTodos'

const benchmarkSuite = new BenchmarkSuite([
  ['es2015', 'ES2015 destructuring'],
  ['immutable', 'immutable 3.8.2'],
  ['immer', 'immer 1.2.0'],
  ['qim', 'qim 0.0.52'],
  ['immutadot', 'immutad●t 2.0.0'],
])

describe('Benchmark suite', () => {
  describe('Update small todos list', () => updateTodos(benchmarkSuite, 'Update small todos list (1000 items)', 1000, 100, 30, 50000))
  describe('Update medium todos list', () => updateTodos(benchmarkSuite, 'Update medium todos list (10000 items)', 10000, 1000, 30, 5000))
  describe('Update large todos list', () => updateTodos(benchmarkSuite, 'Update large todos list (100000 items)', 100000, 10000, 30, 500))

  afterAll(() => benchmarkSuite.log())
})
