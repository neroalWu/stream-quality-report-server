const mongoose = require('mongoose')
const CONFIGURATION = require('./configuration')

const ImageModel = require('./model/image-model')
const TopiqModel = require('./model/topiq-model')

class MongoDB {
    constructor() {
        this.limitCount = 20
    }

    async Connect(uri) {
        try {
            await mongoose.connect(uri)
            console.log('MongoDB connect success.')
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
        }
    }

    async GetTopiqList(postBody) {
        const { region, streamType, bitrateType } = postBody

        const filterStreams = CONFIGURATION.STREAM_LIST.filter((stream) => {
            const regionMatch = region != '' ? stream.region == region : true
            const streamTypeMatch = streamType != '' ? stream.streamType == streamType : true
            const bitrateTypeMatch = bitrateType != '' ? stream.bitrateType == bitrateType : true

            return regionMatch && streamTypeMatch && bitrateTypeMatch
        })

        const topiqResponse = await this.create_topiq_response(filterStreams)
        const validResponse = topiqResponse.filter((x) => x.timestamp_list.length > 0)

        return validResponse
    }

    async CreateTopiq(topiq) {
        TopiqModel.create(topiq)
    }

    async CreateImage(id, buffer) {
        ImageModel.create({
            id: id,
            buffer: buffer
        })
    }

    async get_field_list(stream, fieldName) {
        try {
            const result = await TopiqModel.find({
                region: { $eq: stream.region },
                streamType: { $eq: stream.streamType },
                bitrateType: { $eq: stream.bitrateType },
                channel: { $eq: stream.channel }
            })
                .sort({ _id: -1 })
                .limit(this.limitCount)

            const list = result.map((topiq) => topiq[fieldName])
            return list
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
