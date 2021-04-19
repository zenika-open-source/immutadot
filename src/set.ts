import { apply } from './apply'

// FIXME try declaring several signatures
export const set: (chunks: TemplateStringsArray, ...args: any[]) => (value: any) => any = apply((_: any, [value]: any[]) => value)
