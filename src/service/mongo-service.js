const mongoose = require('mongoose')
const CONFIGURATION = require('../configuration')
const Logger = require('../util/logger')

const TopiqModel = require('../model/topiq-model')
const Util = require('../util/util')

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

    async GetSummarys(postBody) {
        const { region, streamType, resolution, startTime, endTime } = postBody

        // create filter stream
        const filterStreams = this.getFilterStreams(region, streamType, resolution)

        // get summarys from topiq db
        const summaryPromises = filterStreams.map(async (stream) => {
            const nr_list = await this.getFieldList(stream, 'topiq-nr', startTime, endTime)

            const flive_list = await this.getFieldList(stream, 'topiq_nr-flive', startTime, endTime)

            const spaq_list = await this.getFieldList(stream, 'topiq_nr-spaq', startTime, endTime)

            return {
                region: stream.region,
                streamType: stream.streamType,
                channel: stream.channel,
                resolution: stream.resolution,

                nr_m: Util.GetMean(nr_list),
                nr_sd: Util.GetStandardDeviation(nr_list),

                flive_m: Util.GetMean(flive_list),
                flive_sd: Util.GetStandardDeviation(flive_list),

                spaq_m: Util.GetMean(spaq_list),
                spaq_sd: Util.GetStandardDeviation(spaq_list)
            }
        })

        const summarys = await Promise.all(summaryPromises)

        return summarys
    }

    async GetDetails(postBody) {
        const { region, streamType, resolution, startTime, endTime } = postBody

        // create filter stream
        const filterStreams = this.getFilterStreams(region, streamType, resolution)

        // create detail promises
        const detailPromises = filterStreams.map(async (stream) => {
            const nrs = await this.getFieldList(stream, 'topiq-nr', startTime, endTime)
            const flives = await this.getFieldList(stream, 'topiq_nr-flive', startTime, endTime)
            const spaqs = await this.getFieldList(stream, 'topiq_nr-spaq', startTime, endTime)
            const timestamps = await this.getFieldList(stream, 'timestamps', startTime, endTime)

            return {
                region: stream.region,
                streamType: stream.streamType,
                channel: stream.channel,
                resolution: stream.resolution,

                nr_m: Util.GetMean(),
                nr_sd: Util.GetStandardDeviation(),

                flive_m: Util.GetMean(),
                flive_sd: Util.GetStandardDeviation(),

                spaq_m: Util.GetMean(),
                spaq_sd: Util.GetStandardDeviation(),

                nrs: nrs,
                flives: flives,
                spaqs: spaqs,

                timestamps: timestamps
            }
        })

        return await Promise.all(detailPromises)
    }

    getFilterStreams(region, streamType, resolution) {
        return CONFIGURATION.STREAM_LIST.filter((stream) => {
            const regionMatch = region != '' ? stream.region == region : true
            const streamTypeMatch = streamType != '' ? stream.streamType == streamType : true
            const resolutionMatch = resolution != '' ? stream.resolution == resolution : true

            return regionMatch && streamTypeMatch && resolutionMatch
        })
    }

    async CreateTopiq(topiq) {
        TopiqModel.create(topiq)
    }

    async getFieldList(stream, fieldName, startTime, endTime) {
        try {
            const result = await TopiqModel.find({
                region: { $eq: stream.region },
                streamType: { $eq: stream.streamType },
                resolution: { $eq: stream.resolution },
                channel: { $eq: stream.channel },
                timestamp: { $gte: startTime, $lte: endTime }
            })
                .sort({ _id: -1 })
                .limit(this.limitCount)

            const list = result.map((topiq) => topiq[fieldName])
            return list.reverse()
        } catch (error) {
            this.logger.Error('get field list failed:', error)
            return []
        }
    }
}

const mongoService = new MongoService()

module.exports = mongoService
