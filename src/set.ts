import { make } from './make'

export const set: (chunks: TemplateStringsArray, root: any) => (value: any) => any = make((_: any, [value]: any[]) => value)
