const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("./node_modules/@badeball/cypress-cucumber-preprocessor/dist/subpath-entrypoints/esbuild.js");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://clientes.3bfactura.com",
    specPattern: "cypress/runners/**/*.feature",
    supportFile: "cypress/hooks/index.js",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      allureCypress(on, {
        resultsDir: "allure-results",
      });

      return config;
    },

    defaultCommandTimeout: 20000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 800,
    screenshotOnRunFailure: true,
    video: false,
  },
});