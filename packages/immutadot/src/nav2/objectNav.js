import { isNil } from 'util/lang'

export const copy = value => isNil(value) ? {} : { ...value }
