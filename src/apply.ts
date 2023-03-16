import { parse } from './parse'
import { walk } from './walk'

export function apply<Args extends any[]>(
  updater: (value: any, ...args: Args) => any,
): <T>(tmplChunks: TemplateStringsArray, root: T, ...tmplArgs: any[]) => (...args: Args) => T {
  return (tmplChunks, root, ...tmplArgs) => {
    const path = parse(tmplChunks.slice(1))
    return (...args: any[]) => walk(path, tmplArgs, root, updater, args)
  }
}
