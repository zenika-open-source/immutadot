import { parse } from './parse'
import { apply } from './path'

export function make(updater: (value: any, args: any[]) => any): (tmplChunks: TemplateStringsArray, ...tmplArgs: any[]) => (...args: any[]) => any {
  return (tmplChunks, ...tmplArgs) => {
    if (tmplChunks[0] === '') {
      const path = parse(tmplChunks.slice(1), tmplArgs.slice(1))
      return (...args: any[]) => apply(path, tmplArgs[0], updater, args)
    }

    const path = parse(tmplChunks, tmplArgs)

    return (...args: any[]) => (root: any) => apply(path, root, updater, args)
  }
}
