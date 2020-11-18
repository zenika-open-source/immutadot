import { parse } from './parse'
import { read, write } from './path'

export function make(updater: (value: any, args: any[]) => any): (tmplChunks: TemplateStringsArray, ...tmplArgs: any[]) => (...args: any[]) => any {
  return (tmplChunks, ...tmplArgs) => {
    if (tmplChunks[0] === '') {
      const path = parse(tmplChunks.slice(1), tmplArgs.slice(1))

      return (...args: any[]) => {
        const accesses = read(path, tmplArgs[0])
        accesses[path.length].forEach((access) => { access.value = updater(access.value, args) })
        write(accesses)
        return accesses[0][0].value
      }
    }

    const path = parse(tmplChunks, tmplArgs)

    return (...args: any[]) => (root: any) => {
      const accesses = read(path, root)
      accesses[path.length].forEach((access) => { access.value = updater(access.value, args) })
      write(accesses)
      return accesses[0][0].value
    }
  }
}
