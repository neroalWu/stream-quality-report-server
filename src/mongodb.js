const { MongoClient } = require('mongodb')
const CONFIGURATION = require('./configuration')

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
        const topiqResponse = await this.create_topiq_response(CONFIGURATION.STREAM_LIST)

        return topiqResponse
    }

    async GetByRegion(queryRegion) {
        const filterStreams = CONFIGURATION.STREAM_LIST.filter(
            (stream) => stream.region == queryRegion
        )
        const topiqResponse = await this.create_topiq_response(filterStreams)

        return topiqResponse
    }

    async GetByStreamType(queryType) {
        const filterStreams = CONFIGURATION.STREAM_LIST.filter((stream) => stream.type == queryType)
        const topiqResponse = await this.create_topiq_response(filterStreams)

        return topiqResponse
    }

    async GetByRegionAndStreamType(queryRegion, queryType) {
        const filterStreams = CONFIGURATION.STREAM_LIST.filter(
            (stream) => stream.region == queryRegion && stream.type == queryType
        )
        const topiqResponse = await this.create_topiq_response(filterStreams)

        return topiqResponse
    }

    async GetByChannel(queryChannel) {
        const filterStreams = CONFIGURATION.STREAM_LIST.filter(stream => stream.channel == queryChannel)
        const topiqResponse = await this.create_topiq_response(filterStreams)

        return topiqResponse
    }

    async RecordTopiqList(topiqList) {
        await this.collection.insertMany(topiqList)
    }

    async get_nr_list(region, type, channel) {
        const result = await this.collection
            .find({
                region: { $eq: region },
                type: { $eq: type },
                channel: { $eq: channel }
            })
            .limit(50)
            .toArray()

        const nrList = result.map((topiq) => topiq['topiq_nr'])
        return nrList
    }

    async get_nr_flive_list(region, type, channel) {
        const result = await this.collection
            .find({
                region: { $eq: region },
                type: { $eq: type },
                channel: { $eq: channel }
            })
            .limit(50)
            .toArray()

        const nrFlaveList = result.map((topiq) => topiq['topiq_nr-flive'])
        return nrFlaveList
    }

    async get_nr_spaq_list(region, type, channel) {
        const result = await this.collection
            .find({
                region: { $eq: region },
                type: { $eq: type },
                channel: { $eq: channel }
            })
            .limit(50)
            .toArray()

        const nrSpaqList = result.map((topiq) => topiq['topiq_nr-spaq'])
        return nrSpaqList
    }

    async get_timestamp_list(region, type, channel) {
        const result = await this.collection
            .find({
                region: { $eq: region },
                type: { $eq: type },
                channel: { $eq: channel }
            })
            .limit(50)
            .toArray()

        const timestampList = result.map((topiq) => topiq['timestamp'])
        return timestampList
    }

    async create_topiq_response(filter_list) {
        const result = Promise.all(
            filter_list.map(async (stream) => {
                return {
                    region: stream.region,
                    type: stream.type,
                    channel: stream.channel,

                    nr_list: await this.get_nr_list(stream.region, stream.type, stream.channel),
                    nr_flive_list: await this.get_nr_flive_list(
                        stream.region,
                        stream.type,
                        stream.channel
                    ),
                    nr_spaq_list: await this.get_nr_spaq_list(
                        stream.region,
                        stream.type,
                        stream.channel
                    ),

                    timestamp_list: await this.get_timestamp_list(
                        stream.region,
                        stream.type,
                        stream.channel
                    )
                }
            })
        )

        return result
    }
}

const mongoDBInstance = new MongoDB()

module.exports = mongoDBInstance
