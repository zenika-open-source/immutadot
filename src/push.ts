import { apply } from './apply'

export const push = apply<[...elements: any[]]>((value: any, ...elements: any[]) => {
  if (value == null) return elements
  return [...value, ...elements]
})
