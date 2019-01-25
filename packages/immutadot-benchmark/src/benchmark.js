const fast = Boolean(process.env.FAST)

export class BenchmarkSuite {
  constructor(reference, contestants) {
    this.reference = reference
    this.contestants = contestants
    this.benchmarks = []
  }

  createBenchmark(title, testResult, pMaxTime = 30, pMaxOperations = 1000) {
    const benchmark = {
      title,
      runs: {},
    }
    this.benchmarks.push(benchmark)

    const maxTime = fast ? pMaxTime / 3 : pMaxTime
    const maxOperations = fast ? Math.round(pMaxOperations / 3) : pMaxOperations

    function run(key, operation) {
      const startTime = Date.now()
      const maxTimeMs = Math.round(maxTime * 1000)

      const startingTime = maxTimeMs / 100 // Starting time is a hundredth of max time
      let startingIterations = 1
      let startingOperations = 0

      while (Date.now() - startTime < startingTime) {
        let iterations = startingIterations
        startingIterations *= 2
        startingOperations += iterations

        while (iterations--) operation()
      }

      const maxRunTime = Math.round(maxTimeMs / 10) // Max run time is a tenth of max time
      const limitEndTime = startTime + maxTimeMs

      const getIterations = (measuredOperations, measuredTime) => Math.min(
        // Either enough operations to consume max run time or remaining time
        Math.ceil(Math.min(maxRunTime, Math.max(limitEndTime - Date.now(), 0)) / (measuredTime / measuredOperations)),
        // Or enough operations to reach max operations
        maxOperations - measuredOperations,
      )

      let nbOperations = 0
      let totalTime = 0
      let iterations = getIterations(startingOperations, Date.now() - startTime)

      while (iterations > 0) {
        nbOperations += iterations

        const runStartTime = Date.now()
        while (iterations--) {
          if (iterations % 100 === 0 && typeof testResult === 'function')
            testResult(key, operation())
          else
            operation()
        }
        totalTime += Date.now() - runStartTime

        iterations = getIterations(nbOperations, totalTime)
      }

      benchmark.runs[key] = {
        totalTime,
        nbOperations,
      }
    }

    return run
  }

  printRun(run) {
    if (run === undefined) return 'No run'
    const { totalTime, nbOperations } = run
    const opTime = totalTime / nbOperations

    let formattedOpTime
    if (opTime < 0.001) {
      const nanoTime = opTime * 1000000
      formattedOpTime = `${(nanoTime).toFixed(3 - Math.ceil(Math.log10(nanoTime)))}ns`
    } else if (opTime < 1) {
      const microTime = opTime * 1000
      formattedOpTime = `${(microTime).toFixed(3 - Math.ceil(Math.log10(microTime)))}µs`
    } else {
      formattedOpTime = `${(opTime).toFixed(3 - Math.ceil(Math.log10(opTime)))}ms`
    }

    return `${Math.round(nbOperations * 1000 / totalTime)}ops/s (${formattedOpTime}/op)`
  }

  printBenchmark({ title, runs }) {
    return `| ${title} | ${this.contestants.map(([key]) => runs[key]).map(run => this.printRun(run)).join(' | ')} |`
  }

  printScore(key) {
    if (key === this.reference) return 100
    const scores = this.benchmarks.map(({ runs }) => {
      const reference = runs[this.reference]
      const run = runs[key]
      if (run === undefined) return undefined
      return run.nbOperations * 100 * reference.totalTime / run.totalTime / reference.nbOperations
    }).filter(score => score !== undefined)
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }

  log() {
    // eslint-disable-next-line
    console.log([
      `|  | ${this.contestants.map(([, title]) => title).join(' | ')} |`,
      `| --- | ${this.contestants.map(() => '---').join(' | ')} |`,
      this.benchmarks.map(benchmark => this.printBenchmark(benchmark)).join('\n'),
      `| Final score | ${this.contestants.map(([key]) => this.printScore(key)).join(' | ')} |`,
    ].join('\n'))
  }
}
