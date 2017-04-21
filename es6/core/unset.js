import fpUnset from 'lodash/fp/unset'

import { lodashFpConvertOptions } from './consts'

export const unset = fpUnset.convert(lodashFpConvertOptions)
