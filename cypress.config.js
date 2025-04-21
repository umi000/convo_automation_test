const { defineConfig } = require("cypress");
// const {  connectToDatabase,  fetchFirstSortedRecord,} = require("./cypress/helpers/dbHelper");
require("dotenv").config();
// const config = {
//   mongoUri: process.env.Mongo_URI,
// };
// module.exports = config;

module.exports = defineConfig({  
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // experimentalStudio: true,
    setupNodeEvents(on, config) {require('cypress-mochawesome-reporter/plugin')(on);},
    baseUrl: "https://develop.stablestakesiq.com/",
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    // setupNodeEvents(on, config) {
    //   on("task", {
    //     connectToDb: async () => {
    //       try {
    //         // await connectToDatabase();
    //         return null;
    //       } catch (error) {
    //         return error.message;
    //       }
    //     },
    //     fetchFirstSortedRecord: async () => {
    //       try {
    //         const record = await fetchFirstSortedRecord(
    //           "equibase_entries",
    //           "createdAt",
    //           -1,
    //           ["postTime", "raceDate", "trackId", "createdAt"]
    //         );
    //         await fetchFirstSortedRecord();
    //         return record;
    //       } catch (error) {
    //         return error.message;
    //       }
    //     },
    //   }
    // );
    //   return config;
    // },
  },
  env: {
    dev: "https://develop.stablestakesiq.com/",
    staging: "https://staging.stablestakesiq.com/",
    beta: "https://beta.stablestakesiq.com/",
    prod: "https://app.stablestakesiq.com/",
  },
});
