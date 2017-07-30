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
  'chrome': 'Chrome'
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
  
    if (process.platform === 'darwin') {
      cmd = 'open'
      
      if (isUrl(location)) {
        if (!app && browser) {
          app = MACOS_BROWSERS[browser]
        }
        
        if (options.incognito && browser) {
          args.push('-n')
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
      
      if (isUrl(location)) {
        if (!app && browser) {
          app = WINDOWS_BROWSERS[browser]
        }
        
        if (options.incognito && browser) {
          appArgs.push(INCOGNITOS[browser])
        }
      }
      
      if (app) {
        args.push(app)
      }
      
      if (appArgs.length !== 0) {
        args = args.concat(appArgs)
      }
      
    } else {
      reject(new Error(`Platform ${process.platform} not supported.`))
    }
    
    args.push(location)
    
    if (!options.outputOnly) {
      childProcess.spawn(cmd, args)
    }
    
    resolve({
      cmd: cmd,
      args: args
    })
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
