import { make } from './make'

export const push: (chunks: TemplateStringsArray, root: any) => (...values: any[]) => any = make((value: any, values: any[]) => value.concat(values))
