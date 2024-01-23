const { MongoClient } = require('mongodb');

const URI = 'mongodb://localhost:27017/stream-quality-report-db';
const COLLECTION_NAME = 'topiq';

async function connectToMongoDB(req, res, next) {
  try {
    const client = new MongoClient(URI);
    await client.connect();
    console.log('Connected to MongoDB');
    req.app.locals.collection = client.db().collection(COLLECTION_NAME);
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = connectToMongoDB;