const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

// Cypress 15 usa tsx internamente para resolver módulos.
// tsx duplica el prefijo "dist/" al usar subpath notation,
// por eso se usa ruta relativa directa al .js
const { createEsbuildPlugin } = require("./node_modules/@badeball/cypress-cucumber-preprocessor/dist/subpath-entrypoints/esbuild.js");

const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://clientes.3bfactura.com",
    specPattern: "cypress/runners/**/*.feature",
    supportFile: "cypress/hooks/index.js",

    async setupNodeEvents(on, config) {
      // 1. Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // 2. esbuild para compilar .feature files
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // 3. Allure reporter (Node side solamente)
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
