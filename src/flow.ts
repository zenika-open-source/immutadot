import { useRefs } from './make'

export function flow(...fns: ((value: any) => any)[]): (value: any) => any {
  return (value) => {
    const refs = new Set()
    return fns.reduce((res, fn) => (fn[useRefs]?.(refs) ?? fn)(res), value)
  }
}
