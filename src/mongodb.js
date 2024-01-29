const { MongoClient } = require('mongodb')
const CONFIGURATION = require('./configuration')

class MongoDB {
    constructor() {
        this.db = null
        this.collection = null
        this.limitCount = 20
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

    async GetTopiqList(queryRegion = '', queryStreamType = '', queryBitrateType = '') {
        const filterStreams = CONFIGURATION.STREAM_LIST.filter((stream) => {
            const regionMatch = queryRegion != '' ? stream.region == queryRegion : true
            const streamTypeMatch =
                queryStreamType != '' ? stream.streamType == queryStreamType : true
            const bitrateTypeMatch =
                queryBitrateType != '' ? stream.bitrateType == queryBitrateType : true

            return regionMatch && streamTypeMatch && bitrateTypeMatch
        })

        const topiqResponse = await this.create_topiq_response(filterStreams)
        const validResponse = topiqResponse.filter((x) => x.timestamp_list.length > 0)

        return validResponse
    }

    async RecordTopiqList(topiqList) {
        await this.collection.insertMany(topiqList)
    }

    async get_field_list(stream, fieldName) {
        try {
            const result = await this.collection
                .find({
                    region: { $eq: stream.region },
                    streamType: { $eq: stream.streamType },
                    bitrateType: { $eq: stream.bitrateType },
                    channel: { $eq: stream.channel }
                })
                .sort({ _id: -1 })
                .limit(this.limitCount)
                .toArray()
            const nrList = result.map((topiq) => topiq[fieldName])
            return nrList
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async create_topiq_response(filter_list) {
        const result = Promise.all(
            filter_list.map(async (stream) => {
                return {
                    region: stream.region,
                    streamType: stream.streamType,
                    bitrateType: stream.bitrateType,
                    channel: stream.channel,

                    nr_list: await this.get_field_list(stream, 'topiq_nr'),
                    nr_flive_list: await this.get_field_list(stream, 'topiq_nr-flive'),
                    nr_spaq_list: await this.get_field_list(stream, 'topiq_nr-spaq'),
                    timestamp_list: await this.get_field_list(stream, 'timestamp')
                }
            })
        )

        return result
    }
}

const mongoDBInstance = new MongoDB()

module.exports = mongoDBInstance
