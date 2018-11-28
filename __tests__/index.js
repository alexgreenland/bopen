const bopen = require('../index')

jest.mock('../utils')

describe('On Windows with Chrome as default browser', () => {
  const outputOnly = true

  beforeEach(() => {
    Object.defineProperty(process, 'platform', {
      value: 'win32'
    })
    require('../utils').__setMockDefaultBrowser('chrome')
  })

  test('opens a URL', () => {
    return bopen('http://example.com/', {
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'Chrome', 'http://example.com/']
      })
    })
  })

  test('opens a URL in incognito', () => {
    return bopen('http://example.com/', {
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'Chrome', '--incognito', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in the background', () => {
    return bopen('http://example.com/', {
      background: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '/min', '""', 'Chrome', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in incognito in the background', () => {
    return bopen('http://example.com/', {
      background: true,
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '/min', '""', 'Chrome', '--incognito', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Chrome', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'Chrome', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Chrome in incognito', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'Chrome', '--incognito', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Edge', () => {
    return bopen('http://example.com/', {
      browser: 'edge',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'microsoft-edge:http://example.com/']
      })
    })
  })

  test('opens a URL in IE', () => {
    return bopen('http://example.com/', {
      browser: 'ie',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'iexplore', 'http://example.com/']
      })
    })
  })

  test('opens a URL in IE in incognito', () => {
    return bopen('http://example.com/', {
      browser: 'ie',
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'iexplore', '-private', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Firefox', () => {
    return bopen('http://example.com/', {
      browser: 'firefox',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'firefox', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Firefox in incognito', () => {
    return bopen('http://example.com/', {
      browser: 'firefox',
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'cmd',
        args: ['/c', 'start', '""', 'firefox', '-private-window', 'http://example.com/']
      })
    })
  })
})

describe('On macOS with Chrome as default browser', () => {
  const outputOnly = true

  beforeEach(() => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })
    require('../utils').__setMockDefaultBrowser('chrome')
  })

  test('opens a URL', () => {
    return bopen('http://example.com/', {
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'google chrome', 'http://example.com/']
      })
    })
  })
  
  test('opens a file URL', () => {
    return bopen('file:///Users/ajrg', {
      outputOnly: outputOnly,
      incognito: false
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['file:///Users/ajrg']
      })
    })
  })
  
  test('opens a file path', () => {
    return bopen('/Users/ajrg', {
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['/Users/ajrg']
      })
    })
  })
  
  test('opens a file URL with a file', () => {
    return bopen('file:///Users/ajrg/test.app', {
      outputOnly: outputOnly,
      incognito: false
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['file:///Users/ajrg/test.app']
      })
    })
  })
  
  test('opens a file path with a file', () => {
    return bopen('file:///Users/ajrg/test.app', {
      outputOnly: outputOnly,
      incognito: false
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['file:///Users/ajrg/test.app']
      })
    })
  })

  test('opens a URL in incognito', () => {
    return bopen('http://example.com/', {
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-n', '-a', 'google chrome', '--args', '--incognito', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Chrome', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'google chrome', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Chrome in incognito', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-n', '-a', 'google chrome', '--args', '--incognito', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Chrome in the background', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      background: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-g', '-a', 'google chrome', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Chrome in incognito in the background', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      incognito: true,
      background: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-n', '-g', '-a', 'google chrome', '--args', '--incognito', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Chrome with specified first args', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      args: ['-n'],
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-n', '-a', 'google chrome', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Chrome with specified app args', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      appArgs: ['--some-app-args', '-more-app-args'],
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'google chrome', '--args', '--some-app-args', '-more-app-args', 'http://example.com/']
      })
    })
  })
  
  test('opens a URL in Chrome with specified first args and app args', () => {
    return bopen('http://example.com/', {
      browser: 'chrome',
      args: ['-n'],
      appArgs: ['--some-app-args', '-more-app-args'],
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-n', '-a', 'google chrome', '--args', '--some-app-args', '-more-app-args', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Firefox', () => {
    return bopen('http://example.com/', {
      browser: 'firefox',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'firefox', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Firefox in incognito', () => {
    return bopen('http://example.com/', {
      browser: 'firefox',
      incognito: true,
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'firefox', '--args', '-private-window', 'http://example.com/']
      })
    })
  })

  test('opens a URL in Safari', () => {
    return bopen('http://example.com/', {
      browser: 'safari',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'safari', 'http://example.com/']
      })
    })
  })
    
  test('opens a path in the default application', () => {
    return bopen('package.json', {
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['package.json']
      })
    })
  })
  
  test('opens a path in the specified application', () => {
    return bopen('package.json', {
      app: 'preview',
      outputOnly: outputOnly
    }).then((result) => {
      expect(result).toEqual({
        cmd: 'open',
        args: ['-a', 'preview', 'package.json']
      })
    })
  })
  
  test('opens a path with outputOnly not set', () => {
    return bopen('index.js', {
    }).then((result) => {
      expect(result.cmd).toEqual('open')
      expect(result.args).toEqual(['index.js'])
    })
  })
  
  test('fails correctly with undefined location', () => {
    return bopen(undefined, {
      outputOnly: outputOnly
    }).catch((result) => {
      expect(result).toEqual(new Error('No location specified'))
    })
  })
  
  test('fails correctly with null location', () => {
    return bopen(null, {
      outputOnly: outputOnly
    }).catch((result) => {
      expect(result).toEqual(new Error('No location specified'))
    })
  })
})

describe('On an unsupported platform', () => {
  const outputOnly = true

  beforeEach(() => {
    Object.defineProperty(process, 'platform', {
      value: 'linux'
    })
    require('../utils').__setMockDefaultBrowser('chrome')
  })

  test('fails correctly with null location', () => {
    return bopen('http://example.com', {
      outputOnly: outputOnly
    }).catch((result) => {
      expect(result).toEqual(new Error('The platform "linux" is not supported'))
    })
  })
})

describe('On macOS with no default browser found', () => {
  const outputOnly = true

  beforeEach(() => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })
    require('../utils').__setMockDefaultBrowser(null)
  })

  test('fails correctly with no default browser found', () => {
    return bopen('http://example.com', {
      outputOnly: outputOnly
    }).catch((result) => {
      expect(result).toEqual(new Error('No default browser found'))
    })
  })
})
