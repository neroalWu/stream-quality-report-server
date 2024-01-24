const cron = require('./cron-job')
const axios = require('axios').default
const CONFIGURATION = require('./configuration')

let cronJob = null
let promises = []

function initializeStreamQualityService(req, res, next) {
    try {
        if (cronJob) {
            cron.StopJob(cronJob)
        }

        cronJob = cron.StartJob(jobHandler)

        next()
    } catch (e) {
        console.error('Error handling initialize stream quality service:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function jobHandler() {
    try {
        if (promises.length == 0) {
            promises = CONFIGURATION.STREAM_LIST.map((stream) => {
                return axios.post('http://localhost:3000/stream-quality-report/calculate_topiq', {
                    url: stream.url,
                    duration: 3,
                    region: stream.region,
                    type: stream.type,
                    channel: stream.channel
                })
            })
        }

        const result = await Promise.all(promises)
        const topiqList = topiqParser(result)

        recordTopiqList(topiqList);
    } catch (error) {
        console.error(error)
    }
}

function topiqParser(result) {
    const reports = result.map((x) => x.data)
    const configs = result.map((x) => JSON.parse(x.config.data))

    for (let i = 0; i < reports.length; i++) {
        const config = configs[i]
        appendRegion(reports[i], config)
        appendStreamType(reports[i], config)
        appendChannel(reports[i], config)
    }

    return reports;
}

function appendRegion(topiq, config) {
    if ('region' in config) {
        Object.assign(topiq, { region: config.region })
    }
}

function appendStreamType(topiq, config) {
    if ('type' in config) {
        Object.assign(topiq, { type: config.type })
    }
}

function appendChannel(topiq, config) {
    if ('channel' in config) {
        Object.assign(topiq, { channel: config.channel })
    }
}

function recordTopiqList(topiqList) {
    console.log('recordTopiqList:', topiqList)
    // axios.post('http://localhost:3000/stream-quality-report/record-topiq-list', {
    //     topiqList: topiqList
    // })
}

module.exports = initializeStreamQualityService
