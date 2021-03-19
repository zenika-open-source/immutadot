import { make2 } from './make'

export const update: (chunks: TemplateStringsArray, ...args: any[]) => (updater: (value: any) => any) => any = make2(
  (value: any, [updater]: any[]) => updater(value),
)
