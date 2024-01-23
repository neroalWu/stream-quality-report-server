const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/stream-quality-report-db';

async function connectToMongoDB(req, res, next) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    req.app.locals.database = client.db();
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = connectToMongoDB;