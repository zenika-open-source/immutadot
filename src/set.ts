import { make2 } from './make'

// FIXME try declaring several signatures
export const set: (chunks: TemplateStringsArray, ...args: any[]) => (value: any) => any = make2((_: any, [value]: any[]) => value)
