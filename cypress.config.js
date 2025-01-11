const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.stablestakesiq.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
   },
  env: {
    MAILOSAUR_API_KEY: "5C3WEUikZciIelzMCDneChNytU0YDSRN"
  }
});
