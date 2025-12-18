<<<<<<< HEAD
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

// Fetch the first sorted record with specific fields
const fetchFirstSortedRecord = async (collectionName, sortField, sortOrder = -1, fields = []) => {
    try {
        const record = await mongoose.connection
            .collection(collectionName)
            .find({})
            .sort({ [sortField]: sortOrder })
            .project(fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {})) 
            .limit(1)
            .toArray();

        if (record.length === 0) {
            console.log(`No records found in ${collectionName}`);
            return null;
        }

        const transformedRecord = {
            postTime: record[0].postTime || null,
            raceDate: record[0].raceDate || null,
            trackId: record[0].trackId || null,
            createdAt: record[0].createdAt || null,
        };

        console.log(`Fetched first sorted record from ${collectionName}:`, record[0]);
        return record[0]; 
    } catch (err) {
        console.error('Error fetching first record:', err);
        throw err;
    }
};


module.exports = {
    connectToDatabase,
    fetchFirstSortedRecord,
=======
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

// Fetch the first sorted record with specific fields
const fetchFirstSortedRecord = async (collectionName, sortField, sortOrder = -1, fields = []) => {
    try {
        const record = await mongoose.connection
            .collection(collectionName)
            .find({})
            .sort({ [sortField]: sortOrder })
            .project(fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {})) 
            .limit(1)
            .toArray();

        if (record.length === 0) {
            console.log(`No records found in ${collectionName}`);
            return null;
        }

        const transformedRecord = {
            postTime: record[0].postTime || null,
            raceDate: record[0].raceDate || null,
            trackId: record[0].trackId || null,
            createdAt: record[0].createdAt || null,
        };

        console.log(`Fetched first sorted record from ${collectionName}:`, record[0]);
        return record[0]; 
    } catch (err) {
        console.error('Error fetching first record:', err);
        throw err;
    }
};


module.exports = {
    connectToDatabase,
    fetchFirstSortedRecord,
>>>>>>> f236a75be5add215e4a825c9ec7360b16fb1b761
};