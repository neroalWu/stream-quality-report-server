const { MongoClient } = require('mongodb')
class MongoDB {
    constructor() {
        this.db = null
        this.collection = null
    }

    async Connect(uri, collection) {
        try {
            const client = new MongoClient(uri)
            await client.connect()
            console.log('Connected to MongoDB')
            this.db = client.db()
            this.collection = this.db.collection(collection)
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
        }
    }

    async GetAll() {
        return await this.collection.find().toArray()
    }

    async GetByRegion(queryRegion) {
        return await this.collection
            .find({
                region: { $eq: queryRegion }
            })
            .toArray()
    }

    async GetByStreamType(queryType) {
        return await this.collection
            .find({
                type: { $eq: queryType }
            })
            .toArray()
    }

    async GetByRegionAndStreamType(queryRegion, queryType) {
        return await this.collection
            .find({
                region: { $eq: queryRegion },
                type: { $eq: queryType }
            })
            .toArray()
    }

    async GetByChannel(queryChannel) {
        return await this.collection
            .find({
                channel: { $eq: queryChannel }
            })
            .toArray()
    }

    async RecordTopiqList(topiqList) {
        await this.collection.insertMany(topiqList)
    }
}

const mongoDBInstance = new MongoDB()

module.exports = mongoDBInstance
