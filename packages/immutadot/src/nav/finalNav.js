class FinalNav {
  constructor(value) {
    this.value = value
  }

  get() {
    return this.value
  }

  update(updater) {
    return updater(this.value)
  }

  get final() {
    return true
  }
}

export function finalNav(value) {
  return new FinalNav(value)
}
