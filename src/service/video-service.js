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
}

const videoService = new VideoService()
module.exports = videoService
