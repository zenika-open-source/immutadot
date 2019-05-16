/* eslint-env jest */
/* eslint-disable no-console */
import { applyArrayMethod } from './applyArrayMethod'

describe('applyArrayMethod', () => {

  it('should console.warn if method does not exist', () => {
    const warn = jest.spyOn(console, 'warn')

    applyArrayMethod('doesNotExist')

    expect(warn).toBeCalledWith('immutadot: Array.prototype.doesNotExist is not available')

    warn.mockRestore()
  })

  it('should throw a TypeError if called and method does not exist', () => {
    const doesNotExist = applyArrayMethod('doesNotExist')

    expect(doesNotExist).toThrowError(TypeError('immutadot: Array.prototype.doesNotExist is not available'))
  })
})
