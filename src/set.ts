import Parser from './parser'
import { NavigatorType } from './path'

export default function set(chunks: TemplateStringsArray, o: any): (v: string) => any {
  if (chunks.length > 2 || chunks[0] !== '') throw TypeError('not implemented')

  const path = [...new Parser(chunks[1])]

  const prop = path[path.length - 1]
  if (prop[0] !== NavigatorType.Prop) throw TypeError('not implemented')

  const copy = { ...o }
  let cur = copy
  for (const nav of path.slice(0, -1)) {
    if (nav[0] !== NavigatorType.Prop) throw TypeError('not implemented')
    let next = o?.[nav[1]]
    if (!next) break
    next = { ...next }
    cur[nav[1]] = next
    cur = next
  }

  if (!cur) return () => o

  return (v) => {
    cur[prop[1]] = v
    return copy
  }
}
