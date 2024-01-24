const cron = require('./cron-job')
const axios = require('axios').default
const CONFIGURATION = require('./configuration')

class StreamQualityService {
    constructor() {
        this.cronJob = null
    }

    Init() {
        console.log('Init StreamQualityService')
        this.cronJob = cron.StartJob(this.HandleCronJob.bind(this))
    }

    async HandleCronJob() {
        const promises = CONFIGURATION.STREAM_LIST.map((stream) => {
            return axios.post(stream.server, {
                url: stream.url,
                duration: 3,
                region: stream.region,
                type: stream.type,
                channel: stream.channel
            })
        })

        const result = await Promise.all(promises)
        const topiqList = this.topiqParser(result)

        this.recordTopiqList(topiqList)
    }

    topiqParser(result) {
        const reports = result.map((x) => x.data)
        const configs = result.map((x) => JSON.parse(x.config.data))
        const timestamp = Date.now()

        for (let i = 0; i < reports.length; i++) {
            const config = configs[i]
            this.appendRegion(reports[i], config)
            this.appendStreamType(reports[i], config)
            this.appendChannel(reports[i], config)
            this.appendTimestamp(reports[i], timestamp)
        }

        return reports
    }

    appendRegion(topiq, config) {
        if ('region' in config) {
            Object.assign(topiq, { region: config.region })
        }
    }

    appendStreamType(topiq, config) {
        if ('type' in config) {
            Object.assign(topiq, { type: config.type })
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
        axios.post('http://localhost:3000/stream-quality-report/record-topiq-list', {
            topiqList: topiqList
        })
    }

    Close() {
        cron.StopJob(this.cronJob)
    }
}

const streamQualityServiceInstance = new StreamQualityService()
module.exports = streamQualityServiceInstance
