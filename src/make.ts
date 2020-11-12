import { parse } from './parse'
import { read, write } from './path'

export function make(updater: (value: any, args: any[]) => any): (chunks: TemplateStringsArray, root: any) => (...args: any[]) => any {
  return (chunks, root) => {
    if (chunks.length !== 2 || chunks[0] !== '') throw TypeError('not implemented')

    const path = parse(chunks[1])

    const accesses = read(path, root)

    return (...args: any[]) => {
      accesses[path.length].forEach((access) => { access[3] = updater(access[3], args) })

      write(accesses)

      return accesses[0][0][3]
    }
  }
}
