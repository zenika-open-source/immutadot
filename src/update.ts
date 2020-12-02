import { make } from './make'

export const update: (chunks: TemplateStringsArray, ...args: any[]) => (updater: (value: any) => any) => any = make(
  (value: any, [updater]: any[]) => updater(value),
)
