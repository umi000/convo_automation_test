const { connectToDatabase, fetchFirstSortedRecord } = require('../../dbHelper');
module.exports = (on, config) => {
  on('task', {
    // Connect to MongoDB
    connectToDb: async () => {
      try {
        await connectToDatabase();
        return null; // Tasks must return null or a value
      } catch (err) {
        return err.message;
      }
    },

    // Fetch the first sorted record with specific fields
    fetchFirstSortedRecord: async ({ collectionName, sortField, sortOrder, fields }) => {
      try {
        const record = await fetchFirstSortedRecord(collectionName, sortField, sortOrder, fields);
        return record; // Return the record to the Cypress test
      } catch (err) {
        return err.message;
      }
    },
  });
  require("cypress-mochawesome-reporter/plugin")(on);
};

Cypress.config({
  testIsolation: false,
});
