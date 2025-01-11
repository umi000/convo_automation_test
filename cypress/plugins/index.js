module.exports = (on, config) => {
  require("cypress-mochawesome-reporter/plugin")(on);
};

Cypress.config({
  testIsolation: false,
});
