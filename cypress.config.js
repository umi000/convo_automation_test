const { defineConfig } = require("cypress");
const { connectToDatabase, fetchFirstSortedRecord } = require("./cypress/helpers/dbHelper");
require('dotenv').config();
const config = {
  mongoUri: process.env.Mongo_URI
}
module.exports = config;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.stablestakesiq.com/',
    setupNodeEvents(on, config) {
      on('task', {
        connectToDb: async () => {
          try {
            await connectToDatabase();
            return null;
          } catch (error) {
            return error.message;
          }
        },
        fetchFirstSortedRecord: async () => {
          try {
            const record = await fetchFirstSortedRecord(
              'equibase_entries',
              'createdAt',
              -1,
              ['postTime', 'raceDate', 'trackId', 'createdAt']
            );
            // await fetchFirstSortedRecord();
            return record;
          } catch (error) {
            return error.message;
          }
        }
      });
      return config;
    },
  },
  env: {
    MAILOSAUR_API_KEY: "5C3WEUikZciIelzMCDneChNytU0YDSRN",
  }
});
