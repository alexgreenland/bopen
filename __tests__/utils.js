const utils = require('../utils')

test('default browser to be returned', () => {
  return utils.getDefaultBrowser().then((result) => {
    expect(result).toBeTruthy()
  })
})

if (process.platform === 'darwin') {
  test('open Safari incognito should work', () => {
    expect.assertions(1)
    return utils.openSafariIncognito('http://example.com/').then((result) => {
      expect(result).toBeFalsy()
    })
  })
} else {
  test('open Safari incognito should fail correctly not on macOS', () => {
    expect.assertions(1)
    return utils.openSafariIncognito('http://example.com/').catch((e) => {
      expect(e.message).toBe('Unsupported platform. macOS only')
    })
  })
}
