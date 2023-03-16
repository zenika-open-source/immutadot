import { apply } from './apply'

export const update = apply<[updater:(value: any, ...args: any[]) => any, ...args: any[]]>((value, updater, ...argsRest) => updater(value, ...argsRest))
