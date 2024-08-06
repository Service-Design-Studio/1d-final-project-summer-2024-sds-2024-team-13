const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on('file:preprocessor', bundler);
      addCucumberPreprocessorPlugin(on, config);

      // Set baseUrl based on the environment variable
      const envBaseUrl = process.env.BASE_URL;
      if (envBaseUrl) {
        config.baseUrl = envBaseUrl;
      }

      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    env: {
      HAWKER_URL_LOCAL: 'http://localhost:3000',
      CUSTOMER_URL_LOCAL: 'http://localhost:3001',
      HAWKER_URL_DEPLOYED: 'https://dbsbiz.as.r.appspot.com/',
      CUSTOMER_URL_DEPLOYED: 'https://dbsbiz-customer-dot-dbsbiz.as.r.appspot.com/'
    }
  },
});
