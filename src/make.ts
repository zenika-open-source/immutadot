import { get, set } from './nav'
import Parser from './parser'

export function make(updater: (value: any, args: any[]) => any): (chunks: TemplateStringsArray, root: any) => (...args: any[]) => any {
  return (chunks, root) => {
    if (chunks.length !== 2 || chunks[0] !== '') throw TypeError('not implemented')

    const path = [...new Parser(chunks[1])]

    const steps = get(path, root)

    return (...args: any[]) => {
      steps[path.length] = updater(steps[path.length], args)

      return set(path, steps)
    }
  }
}
