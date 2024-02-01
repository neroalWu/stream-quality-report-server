const mongoose = require('mongoose')
const CONFIGURATION = require('../configuration')
const Logger = require('../util/logger')

const ImageModel = require('../model/image-model')
const TopiqModel = require('../model/topiq-model')

class MongoService {
    constructor() {
        this.limitCount = 20
        this.logger = new Logger('MongoService')
    }

    async Connect(uri) {
        this.logger.Log('connecting...')
        try {
            await mongoose.connect(uri)
            this.logger.Log('connected success!')
        } catch (error) {
            this.logger.Error('connected failed!', error)
        }
    }

    async GetTopiqDataList(postBody) {
        const { region, streamType, resolution } = postBody

        const filterStreams = CONFIGURATION.STREAM_LIST.filter((stream) => {
            const regionMatch = region != '' ? stream.region == region : true
            const streamTypeMatch = streamType != '' ? stream.streamType == streamType : true
            const resolutionMatch = resolution != '' ? stream.resolution == resolution : true

            return regionMatch && streamTypeMatch && resolutionMatch
        })

        const topiqDataList = await this.createTopiqDataList(filterStreams)
        const validDataList = topiqDataList.filter((x) => x.timestamp_list.length > 0)

        return validDataList
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

    async GetImageBase64(id) {
        const imageModel = await ImageModel.findOne({ id: id })
        return imageModel ? `data:image/png;base64,${imageModel.buffer.toString('base64')}` : ''
    }

    async getFieldList(stream, fieldName) {
        try {
            const result = await TopiqModel.find({
                region: { $eq: stream.region },
                streamType: { $eq: stream.streamType },
                resolution: { $eq: stream.resolution },
                channel: { $eq: stream.channel }
            })
                .sort({ _id: -1 })
                .limit(this.limitCount)

            const list = result.map((topiq) => topiq[fieldName])
            return list
        } catch (error) {
            this.logger.Error('get field list failed:', error)
            return []
        }
    }

    async createTopiqDataList(filter_list) {
        const result = Promise.all(
            filter_list.map(async (stream) => {
                const nr_reverse_list = (await this.getFieldList(stream, 'topiq_nr')).reverse()
                const flive_reverse_list = (
                    await this.getFieldList(stream, 'topiq_nr-flive')
                ).reverse()
                const spaq_reverse_list = (
                    await this.getFieldList(stream, 'topiq_nr-spaq')
                ).reverse()
                const timestamp_reverse_list = (
                    await this.getFieldList(stream, 'timestamp')
                ).reverse()

                return {
                    region: stream.region,
                    streamType: stream.streamType,
                    resolution: stream.resolution,
                    channel: stream.channel,

                    nr_list: nr_reverse_list,
                    nr_flive_list: flive_reverse_list,
                    nr_spaq_list: spaq_reverse_list,
                    timestamp_list: timestamp_reverse_list
                }
            })
        )

        return result
    }
}

const mongoService = new MongoService()

module.exports = mongoService
