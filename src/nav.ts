import { Navigator, NavigatorType } from './path'

export function set(path: Navigator[], steps: any[]) {
  for (let i = path.length - 1; i >= 0; i--) {
    if (steps[i] === undefined || steps[i] === null) {
      switch (path[i][0]) {
        case NavigatorType.Prop:
          steps[i] = {}
          break
        case NavigatorType.Index:
          steps[i] = []
          break
      }
    } else {
      if (typeof steps[i] !== 'object') throw TypeError('not implemented')

      steps[i] = Array.isArray(steps[i]) ? [...steps[i]] : { ...steps[i] }
    }

    steps[i][path[i][1]] = steps[i + 1]
  }

  return steps[0]
}

export function get(path: Navigator[], root: any) {
  const steps = Array(path.length + 1)
  steps[0] = root

  for (let i = 0; i < path.length; i++) {
    switch (path[i][0]) {
      case NavigatorType.Prop:
      case NavigatorType.Index:
        steps[i + 1] = steps[i]?.[path[i][1]]
        break
      default: throw TypeError('not implemented')
    }
  }
  return steps
}
