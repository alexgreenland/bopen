const utils = require('../utils')

test('default browser to be returned', () => {
  return utils.getDefaultBrowser().then((result) => {
    expect(result).toBeTruthy()
  })
})

test('open Safari incognito should work', () => {
  return utils.openSafariIncognito('http://example.com/').then((result) => {
    expect.assertions(1)
    expect(result).toBeFalsy()
  })
})
