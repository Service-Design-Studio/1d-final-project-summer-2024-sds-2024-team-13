const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  const options = browserify.defaultOptions;

  options.browserifyOptions.plugin.unshift(['tsify']);

  on('file:preprocessor', cucumber(options));
};
