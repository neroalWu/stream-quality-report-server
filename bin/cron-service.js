#!/usr/bin/env node

const axios = require('axios').default
const ffmpeg = require('fluent-ffmpeg')
const CONFIGURATION = require('../src/configuration')
const MongoService = require('../src/service/mongo-service')
const Logger = require('../src/util/logger')
const CronJob = require('cron').CronJob

class CronService {
    constructor() {
        this.cronJob = null
        this.delay = 1000
        this.timestamp = 0
        this.logger = new Logger('CronService')
    }

    Init() {
        this.logger.Log('Init')
        this.cronJob = this.startJob(this.handleCronJob.bind(this))
    }

    startJob(callback) {
        this.logger.Log('Start Job')
        return new CronJob(CONFIGURATION.CRON_TIME, () => callback(), null, true, 'Asia/Taipei')
    }

    stopJob(job) {
        this.logger.Log('Stop Job')

        job && job.stop && job.stop()
    }

    async handleCronJob() {
        this.timestamp = Date.now()

        const queue = CONFIGURATION.STREAM_LIST.reduce(async (acc, stream) => {
            await acc
            await this.processImage(stream)
            await this.processTopiq(stream)
            await new Promise((resolve) => setTimeout(resolve, this.delay))
        }, Promise.resolve())

        await queue
    }

    async processImage(streamConfig) {
        this.logger.Log('Process Image:', streamConfig.channel)

        return new Promise((resolve) => {
            const screenShotStream = ffmpeg(`${streamConfig.source}${streamConfig.channel}`)
                .frames(1)
                .toFormat('image2')
                .on('error', (error) => {
                    this.logger.Error(`${streamConfig.channel} fail!`, error)
                    resolve()
                })
                .pipe()

            let buffers = []
            screenShotStream.on('data', (chunk) => {
                buffers.push(chunk)
            })
            screenShotStream.on('end', async () => {
                const buffer = Buffer.concat(buffers)
                const id = `${streamConfig.region}_${streamConfig.streamType}_${streamConfig.channel}_${this.timestamp}`
                MongoService.CreateImage(id, buffer)

                resolve()
            })
        })
    }

    async processTopiq(streamConfig) {
        this.logger.Log('Process topiq:', streamConfig.channel)

        try {
            const response = await axios.post(streamConfig.server, {
                url: streamConfig.source,
                duration: 3,
                region: streamConfig.region,
                streamType: streamConfig.streamType,
                resolution: streamConfig.resolution,
                channel: streamConfig.channel
            })

            const topiq = this.topiqParser(response)
            MongoService.CreateTopiq(topiq)
        } catch (error) {
            this.logger.Error(`Process topiq error: ${streamConfig.server} ${error}`)
        }
    }

    topiqParser(source) {
        const config = JSON.parse(source.config.data)
        let destination = source.data

        this.appendRegion(destination, config)
        this.appendStreamType(destination, config)
        this.appendResolution(destination, config)
        this.appendChannel(destination, config)
        this.appendTimestamp(destination, this.timestamp)

        return destination
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

    appendResolution(topiq, config) {
        if ('resolution' in config) {
            Object.assign(topiq, { resolution: config.resolution })
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
}

async function main() {
    await MongoService.Connect(CONFIGURATION.MONGODB_URL)

    const cronService = new CronService()
    cronService.Init()
}

main()
