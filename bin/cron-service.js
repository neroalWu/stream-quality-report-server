const cron = require('../src/cron-job')
const axios = require('axios').default
const CONFIGURATION = require('../src/configuration')
const mongoDBInstance = require('../src/mongodb')
class StreamQualityService {
    constructor() {
        this.cronJob = null
        this.delay = 1000
        this.timestamp = 0
    }

    Init() {
        console.log('Init StreamQualityService')
        this.cronJob = cron.StartJob(this.HandleCronJob.bind(this))
    }

    async HandleCronJob() {
        this.timestamp = Date.now()

        const queue = CONFIGURATION.STREAM_LIST.reduce(async (acc, stream) => {
            await acc
            await this.processStream(stream)
            await new Promise((resolve) => setTimeout(resolve, this.delay))
        }, Promise.resolve())

        await queue

        console.log('All streams have benn processed')
    }

    async processStream(streamConfig) {
        console.log(`Process stream:: ${streamConfig.channel}`)

        try {
            const response = await axios.post(streamConfig.server, {
                url: streamConfig.source,
                duration: 3,
                region: streamConfig.region,
                streamType: streamConfig.streamType,
                bitrateType: streamConfig.bitrateType,
                channel: streamConfig.channel
            })

            const topiqList = this.topiqParser([response])
            this.recordTopiqList(topiqList)
        } catch (error) {
            console.error(`Error for ${streamConfig.server}: ${error}`)
        }
    }

    topiqParser(result) {
        const reports = result.map((x) => x.data)
        const configs = result.map((x) => JSON.parse(x.config.data))

        for (let i = 0; i < reports.length; i++) {
            const config = configs[i]
            this.appendRegion(reports[i], config)
            this.appendStreamType(reports[i], config)
            this.appendBitrateType(reports[i], config)
            this.appendChannel(reports[i], config)
            this.appendTimestamp(reports[i], this.timestamp)
        }

        return reports
    }

    appendRegion(topiq, config) {
        if ('region' in config) {
            Object.assign(topiq, { region: config.region })
        }
    }

    appendStreamType(topiq, config) {
        if ('streamType' in config) {
            Object.assign(topiq, { streamType: config.streamType })
        }
    }

    appendBitrateType(topiq, config) {
        if ('bitrateType' in config) {
            Object.assign(topiq, { bitrateType: config.bitrateType })
        }
    }

    appendChannel(topiq, config) {
        if ('channel' in config) {
            Object.assign(topiq, { channel: config.channel })
        }
    }

    appendTimestamp(topiq, timestamp) {
        Object.assign(topiq, { timestamp: timestamp })
    }

    recordTopiqList(topiqList) {
        mongoDBInstance.RecordTopiqList(topiqList)
    }

    Close() {
        cron.StopJob(this.cronJob)
    }
}

async function main() {
    await mongoDBInstance.Connect(
        CONFIGURATION.MONGODB_CONFIG.URI,
        CONFIGURATION.MONGODB_CONFIG.COLLECTION
    )

    const streamQualityServiceInstance = new StreamQualityService()
    streamQualityServiceInstance.Init()
}

main()
