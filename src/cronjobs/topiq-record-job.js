const CronJob = require('cron').CronJob

const path = require('path')
const ffmpeg = require('fluent-ffmpeg')

const axios = require('axios').default
const MongoService = require('../service/mongo-service')
const CONFIGURATION = require('../configuration')
const Logger = require('../util/logger')

if (process.platform === 'linux') {
    const ffmpegStaticPath = path.resolve(__dirname, '../../ffmpeg-static')
    ffmpeg.setFfmpegPath(path.join(ffmpegStaticPath, 'ffmpeg'))
}

class TopiqRecordJob {
    constructor(cronTime) {
        this.job = null
        this.cronTime = cronTime
        this.delay = 1000
        this.handleTimestamp = 0

        this.logger = new Logger('TopiqRecordJob')
    }

    static Create(cronTime) {
        return new TopiqRecordJob(cronTime)
    }

    Start() {
        this.logger.Log('Start')

        this.job = new CronJob(this.cronTime, () => this.HandleJob(), null, true, 'Asia/Taipei')
    }

    Stop() {
        this.logger.Log('Stop')

        this.job && this.job.stop()
    }

    async HandleJob() {
        this.logger.Log('HandleJob')

        this.handleTimestamp = Date.now()

        const queue = CONFIGURATION.STREAM_LIST.reduce(async (acc, stream) => {
            await acc
            await this.recordTopiq(stream)
            await this.recordVideo(stream)
            await new Promise((resolve) => setTimeout(resolve, this.delay))
        }, Promise.resolve())

        await queue
    }

    async recordTopiq(streamConfig) {
        this.logger.Log('Process topiq:', streamConfig.channel)

        const postBody = {
            url: streamConfig.source + streamConfig.channel,
            duration: 3,
            region: streamConfig.region,
            streamType: streamConfig.streamType,
            resolution: streamConfig.resolution,
            channel: streamConfig.channel
        }

        return new Promise(async (resolve) => {
            try {
                const response = await axios.post(streamConfig.server, postBody)

                const topiq = this.topiqParser(response)
                MongoService.InsertTopiqModel(topiq)
            } catch (error) {
                this.logger.Error(`Process topiq error: ${streamConfig.server} ${error}`)
            } finally {
                resolve()
            }
        })
    }

    topiqParser(source) {
        const config = JSON.parse(source.config.data)
        let destination = source.data

        this.logger.Log('Source:', source)

        this.appendRegion(destination, config)
        this.appendStreamType(destination, config)
        this.appendResolution(destination, config)
        this.appendChannel(destination, config)
        this.appendTimestamp(destination, this.handleTimestamp)

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

    async recordVideo(streamConfig) {
        const videoSrc = streamConfig.source + streamConfig.channel
        const outputPath = path.join(__dirname, '..', '..', 'public', 'videos/')
        const outputName = `${streamConfig.region}_${streamConfig.streamType}_${streamConfig.channel}_${this.handleTimestamp}.mp4`

        return new Promise((resolve) => {
            ffmpeg(videoSrc)
                .format('mp4')
                .duration(3)
                .on('end', () => {
                    this.logger.Log(streamConfig.channel, ' Recording finished!')
                    resolve()
                })
                .on('error', (error) => {
                    this.logger.Error(streamConfig.channel, 'Recording failed:', error)
                    resolve()
                })
                .save(outputPath + outputName)
        })
    }
}

module.exports = TopiqRecordJob
