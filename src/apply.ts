import { parse } from './parse'
import { walk } from './walk'

export function apply(updater: (value: any, args: any[]) => any): (tmplChunks: TemplateStringsArray, ...tmplArgs: any[]) => (...args: any[]) => any {
  return (tmplChunks, ...tmplArgs) => {
    if (tmplChunks[0] === '') {
      const [, ...restChunks] = tmplChunks
      const path = parse(restChunks)
      const [firstArg, ...restArgs] = tmplArgs
      return (...args: any[]) => walk(path, restArgs, firstArg, updater, args)
    }

    const path = parse(tmplChunks)

    return (...args: any[]) => (root: any) => walk(path, tmplArgs, root, updater, args)
  }
}
