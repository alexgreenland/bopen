'use strict'

const childProcess = require('child_process')
const isUrl = require('is-url')
const utils = require('./utils')

const MACOS_BROWSERS = {
  'chrome': 'google chrome',
  'firefox': 'firefox',
  'safari': 'safari'
}

const WINDOWS_BROWSERS = {
  'chrome': 'Chrome',
  'ie': 'iexplore',
  'firefox': 'firefox',
  'edge': 'microsoft-edge'
}

const INCOGNITOS = {
  'chrome': '--incognito',
  'firefox': '-private-window',
  'ie': '-private'
}

const open = (location, options) => {
  return new Promise((resolve, reject) => {
    if (typeof location !== 'string') {
      return reject(new Error('No location specified'))
    }

    let defaultBrowser = options.defaultBrowser
    let browser = options.browser || defaultBrowser

    let cmd
    let app = options.app
    let args = options.args || []
    let appArgs = options.appArgs || []
    let isAUrl = isUrl(location)
    let isToOpenInSafariInIncognito = false

    if (process.platform === 'darwin') {
      cmd = 'open'

      if (isAUrl) {
        if (!app && browser) {
          app = MACOS_BROWSERS[browser]
        }

        if (browser === 'safari' && options.incognito) {
          isToOpenInSafariInIncognito = true
        }

        if (options.incognito && browser && INCOGNITOS[browser]) {
          if (browser === 'chrome') {
            args.push('-n')
          }
          appArgs.push(INCOGNITOS[browser])
        }
      }

      if (app) {
        args.push('-a', app)
      }

      if (appArgs.length !== 0) {
        args.push('--args')
        args = args.concat(appArgs)
      }
    } else if (process.platform === 'win32') {
      cmd = 'cmd'
      args.push('/c', 'start', '""')
      location = location.replace(/&/g, '^&')

      if (isAUrl) {
        if (!app && browser) {
          app = WINDOWS_BROWSERS[browser]
        }

        if (options.incognito && browser) {
          appArgs.push(INCOGNITOS[browser])
        }
      }

      if (app) {
        let appForArgs = app

        if (browser === 'edge') {
          appForArgs = `${app}:${location}`
        }

        args.push(appForArgs)
      }

      if (appArgs.length !== 0) {
        args = args.concat(appArgs)
      }
    } else {
      reject(new Error(`The platform "${process.platform}" is not supported`))
    }

    if (browser !== 'edge') {
      args.push(location)
    }

    if (!isToOpenInSafariInIncognito) {
      if (!options.outputOnly) {
        const child = childProcess.spawn(cmd, args, {
          detached: true,
          stdio: 'ignore'
        })
        child.unref()
      }

      resolve({
        cmd: cmd,
        args: args
      })
    } else {
      utils.openSafariIncognito(location).then(response => {
        resolve(response)
      }).catch(reason => {
        reject(reason)
      })
    }
  })
}

module.exports = (location, opts) => {
  return new Promise((resolve, reject) => {
    let options = opts || {}
    utils.getDefaultBrowser().then((defaultBrowser) => {
      options.defaultBrowser = defaultBrowser
      open(location, options).then((response) => {
        resolve(response)
      }).catch((reason) => {
        return reject(reason)
      })
    }).catch(() => {
      return reject(new Error('No default browser found'))
    })
  })
}
