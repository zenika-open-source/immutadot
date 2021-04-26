import { apply } from './apply'

export const flow = apply((value: any, fns: ((value: any) => any)[]) => fns.reduce((res, fn) => fn(res), value))
