export function flow(...fns: ((value: any, refs: Set<any>) => any)[]): (value: any) => any {
  return (value) => {
    const refs = new Set()
    return fns.reduce((res, fn) => fn(res, refs), value)
  }
}
