'use strict'

const DefaultBrowser = require('x-default-browser')

exports.getDefaultBrowser = () => {
  return new Promise((resolve, reject) => {
    DefaultBrowser((err, browser) => {
      if (err) {
        reject(new Error(err))
      }

      resolve(browser.commonName)
    })
  })
}
