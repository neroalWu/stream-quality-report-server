const fs = require('fs')
const path = require('path')
const CONFIGURATION = require('../configuration')
const Logger = require('../util/logger')

class VideoService {
    constructor() {
        this.logger = new Logger('VideoService')
    }

    async GetVideoURL(postBody) {
        const { region, streamType, resolution, channel, timestamp } = postBody

        let videoUrl = ''

        if (!this.validStream(region, streamType, resolution, channel)) return videoUrl

        videoUrl = this.createVideoUrl(region, streamType, channel, timestamp)

        return videoUrl
    }

    validStream(region, streamType, resolution, channel) {
        return CONFIGURATION.STREAM_LIST.some(
            (stream) =>
                stream.region == region &&
                stream.streamType == streamType &&
                stream.resolution == resolution &&
                stream.channel == channel
        )
    }

    createVideoUrl(region, streamType, channel, timestamp) {
        return `${CONFIGURATION.HOST_URL}videos/${region}_${streamType}_${channel}_${timestamp}.mp4`
    }

    DeleteOldVideos() {
        this.logger.Log('DeleteOldVideos')

        const videosDir = path.join(__dirname, '..', '..', 'public', 'videos')
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

        fs.readdir(videosDir, (err, files) => {
            if (err) {
                console.error('read folder fail:', err)
                return
            }

            files.forEach((file) => {
                const filePath = path.join(videosDir, file)
                const stats = fs.statSync(filePath)
                const fileDate = stats.mtime

                if (fileDate < oneMonthAgo) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            this.logger.Log('delete fail:', err)
                        } else {
                            this.logger.Log('delete success:', file)
                        }
                    })
                }
            })
        })
    }
}

const videoService = new VideoService()
module.exports = videoService
