import { apply } from './apply'
import { parse } from './parse'

export function make(updater: (value: any, args: any[]) => any): (tmplChunks: TemplateStringsArray, ...tmplArgs: any[]) => (...args: any[]) => any {
  return (tmplChunks, ...tmplArgs) => {
    if (tmplChunks[0] === '') {
      const [, ...restChunks] = tmplChunks
      const path = parse(restChunks)
      const [firstArg, ...restArgs] = tmplArgs
      return (...args: any[]) => apply(path, restArgs, firstArg, updater, args)
    }

    const path = parse(tmplChunks)

    return (...args: any[]) => (root: any) => apply(path, tmplArgs, root, updater, args)
  }
}
