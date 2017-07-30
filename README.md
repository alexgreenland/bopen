# bopen

A better native open utility for macOS and Windows, with emphasis on browsers and sugar for common configuration. Open URLs, file paths and other locators as supported by your system. 

Provide the location and optionally the target browser or application, and whether to open in incognito/private mode, alongside initial arguments and app arguments. Rather than forking, `bopen` spawns the target process for improved safety.

## Install

```
$ npm install --save bopen
```

## Usage

```js
const bopen = require('bopen')

// Open URL in default browser
bopen('http://example.com')

// Open URL in Google Chrome
bopen('http://example.com', {browser: 'chrome'})

// Open URL in Firefox
bopen('http://example.com', {browser: 'firefox'})

// Open URL in Internet Explorer
bopen('http://example.com', {browser: 'ie'})

// Open URL in Edge
bopen('http://example.com', {browser: 'edge'})

// Open URL in Safari
bopen('http://example.com', {browser: 'safari'})

// Open URL in Google Chrome in incognito mode
bopen('http://example.com', {browser: 'chrome', incognito: true})

// Open URL in Internet Explorer with InPrivate mode
bopen('http://example.com', {browser: 'ie', incognito: true})

// Open file path
bopen('/Users/ajrg')

// Open an image in the default viewer
bopen('image.png')

// Open an image in the specified application
bopen('image.png', {app: 'preview'})
```

## Browsers

| Browser           | `bopen` name    | Incognito/private mode launch support |
|-------------------|-----------------|---------------------------------------|
| Google Chrome     | chrome          | Yes (Incognito)                       |
| Mozilla Firefox   | firefox         | Yes (Private)                         |
| Internet Explorer | ie              | Yes (InPrivate)                       |
| Microsoft Edge    | edge            | No                                    |
| Safari            | safari          | No (planned)                          |

## Supported Platforms

- macOS. Tested in Chrome, Firefox and Safari. Optimised for Chrome and Firefox.
- Windows. Tested in Chrome, Edge and IE. Optimised for Chrome and IE.

Incognito launch support for Chrome, Firefox and IE. In Firefox, opening incognito with a URL is supported if an incognito window is not already open. Edge incognito support is awaiting command line switch support from Microsoft.

## API

### bopen(location, [options])

Opens the location with optional options. Returns a promise with the command and arguments.

### location

`string`. Required. The path to open, such as a URL or file.

### options

`object`. Optional.

#### browser

`string`. Optional. Default: default browser. Open the URL in the specified browser. The browser name is platform agnostic — you do not need to reference the platform specific app name. Use the [Browsers](#browsers) table for reference. For example, with Google Chrome, the `bopen` browser is "chrome". The `browser` option overrides `app`.

#### incognito

`boolean`. Optional. Default: `false`. Open the URL in the browser's incognito mode.

#### app

`string`. Optional. Default: default opener. You can specify the app for non-URL locations when you want to use another opener application. The `app` option is overridden by `browser`.

#### args

`array`. Optional. Default: `[]`. You can pass in initial arguments to the opener command.

#### appArgs

`array`. Optional. Default: `[]`. Specify additional arguments for the target application.

## License

Apache 2.0. © Alex Greenland, [ajrg.co](http://ajrg.co/)
