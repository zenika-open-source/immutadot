import { apply } from './apply'

export const update: (chunks: TemplateStringsArray, ...args: any[]) => (updater: (value: any) => any) => any = apply(
  (value: any, [updater]: any[]) => updater(value),
)
