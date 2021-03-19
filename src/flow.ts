// FIXME flow should take a path, otherwise it's _.flow()...
export function flow(...fns: ((value: any) => any)[]): (value: any) => any {
  return (value) => fns.reduce((res, fn) => fn(res), value)
}
