'use strict'

const DefaultBrowser = require('x-default-browser')
const applescript = require('applescript')

exports.getDefaultBrowser = () => {
  return new Promise((resolve, reject) => {
    DefaultBrowser((err, browser) => {
      if (err) {
        return reject(new Error(err))
      }

      return resolve(browser.commonName)
    })
  })
}

exports.openSafariIncognito = (url) => {
  return new Promise((resolve, reject) => {
    if (process.platform !== 'darwin') {
      return reject(new Error('Unsupported platform. macOS only'))
    }

    let script = `
      on isRunning(appName)
        tell application "System Events" to (name of processes) contains appName
      end isRunning

      set isSafariRunning to isRunning("Safari")

      if isSafariRunning then
        tell application "Safari" to activate
        delay 0.5
        tell application "System Events" to keystroke "n" using {command down, shift down}
      else
        tell application "Safari" to activate
        delay 0.5
        tell application "System Events"
          keystroke "w" using command down
          keystroke "n" using {command down, shift down}
        end tell
      end if

      delay 0.5
      tell application "Safari" to set the URL of the front document to "${url}"
    `

    applescript.execString(script, (err, response) => {
      if (err) {
        return reject(new Error(err))
      }

      return resolve(response)
    })
  })
}
