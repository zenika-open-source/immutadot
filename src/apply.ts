import { compile } from './compile'
import { Updater } from './updater'

export function apply<Args extends any[]>(
  updater: Updater<Args>,
): <T>(tmplChunks: TemplateStringsArray, root: T, ...pathArgs: any[]) => (...updaterArgs: Args) => T {
  return (tmplChunks, root, ...pathArgs) => {
    const link = compile(tmplChunks.slice(1), pathArgs, updater)
    return (...updaterArgs: Args) => link(root, pathArgs, updaterArgs)
  }
}
