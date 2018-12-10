export class BaseNav {
  constructor(value, next) {
    this.value = value
    this._next = next
  }

  get final() {
    return false
  }
}
