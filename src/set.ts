import { make } from './make'

// FIXME try declaring several signatures
export const set: (chunks: TemplateStringsArray, ...args: any[]) => (value: any) => any = make((_: any, [value]: any[]) => value)
