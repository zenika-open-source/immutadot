export function createBenchmark(title, maxTime = 10, maxOperations = 1000) {

  const runs = []

  function run(opTitle, operation) {
    const startTime = Date.now()
    const maxTimeMs = maxTime * 1000
    const maxRunTime = maxTimeMs / 10 // Max run time is a tenth of max time
    const limitEndTime = startTime + maxTimeMs

    let iterations = Math.min(10, maxOperations) // Start 10 iterations
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
          .map(({ title, totalTime, nbOperations }) => `  ${title}: ~${(totalTime / nbOperations).toFixed(2)}ms/op on ${nbOperations}ops`)
          .join('\n')
      }`,
    )
  }

  return run
}
