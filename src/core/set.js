import { apply } from './apply'
import { unsafeToPath } from './toPath'

const set = (obj, path, value) => apply(obj, unsafeToPath(path), () => value)

export { set }
