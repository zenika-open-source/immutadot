import fpSet from 'lodash/fp/set'

import { lodashFpConvertOptions } from './consts'

export const set = fpSet.convert(lodashFpConvertOptions)
