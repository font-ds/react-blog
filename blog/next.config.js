const withCss = require('@zeit/next-css')
const flat = require('array.prototype.flat/implementation')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => { }
}

module.exports = withCss({})
module.exports = {
  webpack5: false
}
