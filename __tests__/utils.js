const utils = require('../utils')

test('default browser to be returned', () => {
  return utils.getDefaultBrowser().then((result) => {
    expect(result).toBeTruthy()
  })
})
