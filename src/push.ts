import { apply } from './apply'

// FIXME manage null/undefined value
// FIXME manage non-array value
export const push = apply<[...elements: any[]]>((value: any, ...elements: any[]) => value.concat(elements))
