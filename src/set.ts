import { apply } from './apply'

export const set = apply<[value: any]>((_, value) => value)
