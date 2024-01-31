#!/usr/bin/env node

const cron = require('../src/cron-job')
const axios = require('axios').default
const ffmpeg = require('fluent-ffmpeg')
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
            await this.processImage(stream)
            await this.processTopiq(stream)
            await new Promise((resolve) => setTimeout(resolve, this.delay))
        }, Promise.resolve())

        await queue

        console.log('All streams have benn processed')
    }

    async processImage(streamConfig) {
        console.log('processImage:', streamConfig.channel)
        return new Promise((resolve, reject) => {
            const screenShotStream = ffmpeg(`${streamConfig.source}${streamConfig.channel}`)
                .frames(1)
                .toFormat('image2')
                .pipe()

            const buffers = []
            screenShotStream.on('data', (chunk) => {
                buffers.push(chunk)
            })
            screenShotStream.on('end', async () => {
                //save image to mongodb
                const buffer = Buffer.concat(buffers)
                const id = `${streamConfig.region}_${streamConfig.streamType}_${streamConfig.channel}_${this.timestamp}`
                mongoDBInstance.CreateImage(id, buffer)

                resolve()
            })
            screenShotStream.on('error', reject)
        })
    }

    async processTopiq(streamConfig) {
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

            const topiq = this.topiqParser(response)
            mongoDBInstance.CreateTopiq(topiq)
        } catch (error) {
            console.error(`Error for ${streamConfig.server}: ${error}`)
        }
    }

    topiqParser(response) {
        const config = JSON.parse(response.config.data)
        let result = response.data

        this.appendRegion(result, config)
        this.appendStreamType(result, config)
        this.appendBitrateType(result, config)
        this.appendChannel(result, config)
        this.appendTimestamp(result, this.timestamp)

        return result
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
