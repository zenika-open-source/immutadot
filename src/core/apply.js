const copy = value => {
  if (Array.isArray(value)) return [...value]
  return { ...value }
}

const callback = (obj, prop) => obj[prop]

const apply = (obj, path, operation) => {
  const walkPath = (curObj, curPath) => {
    if (curPath.length === 0) return operation(curObj)

    const [prop] = curPath

    const value = callback(curObj, prop)

    const newValue = walkPath(value, curPath.slice(1))

    const newObj = copy(curObj)
    newObj[prop] = newValue

    return newObj
  }

  return walkPath(obj, path)
}

export { apply }
