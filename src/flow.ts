import { useRefs } from './make'

export function flow(...fns: ((value: any) => any)[]): (value: any) => any {
  return (value) => {
    const refs = new Set()
    return fns.map((fn) => fn[useRefs]?.(refs) ?? fn).reduce((res, fn) => fn(res), value)
  }
}
