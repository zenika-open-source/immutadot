import { apply } from './apply'

// FIXME manage null/undefined value
// FIXME manage non-array value
export const push: (chunks: TemplateStringsArray, ...args: any[]) => (...values: any[]) => any = apply((value: any, values: any[]) => value.concat(values))
