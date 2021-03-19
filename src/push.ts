import { make } from './make'

// FIXME manage null/undefined value
// FIXME manage non-array value
export const push: (chunks: TemplateStringsArray, ...args: any[]) => (...values: any[]) => any = make((value: any, values: any[]) => value.concat(values))
