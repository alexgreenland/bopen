'use strict'

const utils = jest.genMockFromModule('../utils')

let mockedDefaultBrowser

let __setMockDefaultBrowser = (defaultBrowser) => {
  mockedDefaultBrowser = defaultBrowser
}

let getDefaultBrowser = () => {
  return new Promise((resolve, reject) => {
    if (mockedDefaultBrowser) {
      return resolve(mockedDefaultBrowser)
    }
    return reject(new Error('No default browser'))
  })
}

utils.__setMockDefaultBrowser = __setMockDefaultBrowser
utils.getDefaultBrowser = getDefaultBrowser

module.exports = utils
