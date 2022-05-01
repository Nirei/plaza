/* config-overrides.js */

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // Beaker has a bug that breaks support for non-inline source maps
    config.devtool = 'inline-source-map'
    return config
  },
}
