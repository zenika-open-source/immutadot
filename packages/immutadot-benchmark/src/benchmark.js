export function createBenchmark(title, testResult, pMaxTime = 30, pMaxOperations = 1000) {

  const fast = Boolean(process.env.FAST)
  const maxTime = fast ? pMaxTime / 3 : pMaxTime, maxOperations = fast ? Math.round(pMaxOperations / 3) : pMaxOperations

  const runs = []

  function run(key, opTitle, operation) {
    const startTime = Date.now()
    const maxTimeMs = Math.round(maxTime * 1000)
    const maxRunTime = Math.round(maxTimeMs / 10) // Max run time is a tenth of max time
    const limitEndTime = startTime + maxTimeMs

    let iterations = 1 // Start with 1 iteration
    let nbOperations = 0
    let totalTime = 0

    while (iterations > 0) {
      nbOperations += iterations

      const runStartTime = Date.now()
      while (iterations--) operation()
      totalTime += Date.now() - runStartTime

      const tempMeanTime = totalTime / nbOperations

      iterations = Math.min(
        // Either enough operations to consume max run time or remaining time
        Math.ceil(Math.min(maxRunTime, Math.max(limitEndTime - Date.now(), 0)) / tempMeanTime),
        // Or enough operations to reach max operations
        maxOperations - nbOperations,
      )
    }

    if (typeof testResult === 'function') testResult(key, operation())

    runs.push({
      title: opTitle,
      totalTime,
      nbOperations,
    })
  }

  run.log = function() {
    console.log( // eslint-disable-line no-console
      `${title}:\n${
        runs
          .map(({ title, totalTime, nbOperations }) => `  ${title}: ~${Math.round(nbOperations * 1000 / totalTime)}ops/s (${(totalTime / nbOperations).toFixed(2)}ms/op) on ${nbOperations}ops`)
          .join('\n')
      }`,
    )
  }

  return run
}
