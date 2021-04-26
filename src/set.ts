import { apply } from './apply'

export const set = apply((_: any, [value]: any[]) => value)
