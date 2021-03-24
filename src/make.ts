import { apply } from './apply'
import { parse } from './parse'

export function make(updater: (value: any, args: any[]) => any): (tmplChunks: TemplateStringsArray, ...tmplArgs: any[]) => (...args: any[]) => any {
  return (tmplChunks, ...tmplArgs) => {
    if (tmplChunks[0] === '') {
      const path = parse(tmplChunks.slice(1))
      return (...args: any[]) => apply(path, tmplArgs.slice(1), tmplArgs[0], updater, args)
    }

    const path = parse(tmplChunks)

    return (...args: any[]) => (root: any) => apply(path, tmplArgs, root, updater, args)
  }
}
