import { apply } from './apply'

export const update: (chunks: TemplateStringsArray, ...args: any[]) => (updater: (...updaterArgs: any[]) => any, ...argsRest: any[]) => any = apply(
  (value: any, [updater, ...argsRest]: any[]) => updater(value, ...argsRest),
)
