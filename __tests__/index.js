const bopen = require('../index')

jest.mock('../utils')

describe('On Windows with Chrome as default browser', () => {
  const outputOnly = true
  
  beforeEach(() => {
    global.process.platform = 'win32'
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
})

describe('On macOS with Chrome as default browser', () => {
  const outputOnly = true
  
  beforeEach(() => {
    global.process.platform = 'darwin'
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
        args: ['-n', '-a', 'firefox', '--args', '-private-window', 'http://example.com/']
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
  
})
