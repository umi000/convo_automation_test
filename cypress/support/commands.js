require('cypress-xpath');

const { MongoClient } = require("mongodb");

Cypress.Commands.add('connectToMongoDB', () => {
    const uri = 'mongodb+srv://abuzar:RQ6qxIqpIwtxhZme@common-central.9hvbzh7.mongodb.net/test?retryWrites=true&w=majority&appName=Common-Central'; // Update with your credentials and URI

    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client.db('test'));
            }
        });
    });
});

Cypress.Commands.add('fetchEquibaseEntries', () => {
    return cy.connectToMongoDB().then((db) => {
        const collection = db.collection('equibase_entries');
        return collection.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(1) // Limit to only the first document after sorting
            .project({ trackId: 1, postTime: 1, raceDate: 1 }) // Select fields to return
            .toArray();
    });
});
// module.exports = (connectToMongoDB)
// module.exports = (fetchEquibaseEntries)
