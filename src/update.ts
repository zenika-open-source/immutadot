import { apply } from './apply'

export const update = apply((value: any, [updater, ...argsRest]: any[]) => updater(value, ...argsRest))
