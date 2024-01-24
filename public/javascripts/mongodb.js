const { MongoClient } = require('mongodb')
class MongoDB {
    constructor() {
        this.db = null
    }

    async Connect(uri, collection) {
        try {
            const client = new MongoClient(uri)
            await client.connect()
            console.log('Connected to MongoDB')
            this.db = client.db().collection(collection)
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
        }
    }

    GetDB() {
        if (!this.db) {
            throw new Error('MongoDB not connected')
        }
        return this.db
    }
}

const mongoDBInstance = new MongoDB()

module.exports = mongoDBInstance
