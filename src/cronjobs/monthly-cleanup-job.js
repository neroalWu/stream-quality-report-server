const Logger = require('../util/logger')
const CronJob = require('cron').CronJob
const MongoService = require('../service/mongo-service')
const VideoService = require('../service/video-service')

class MonthlyCleanupJob {
    constructor(cronTime) {
        this.job = null
        this.cronTime = cronTime

        this.logger = new Logger('MonthlyCleanupJob')
    }

    static Create(cronTime) {
        return new MonthlyCleanupJob(cronTime)
    }

    Start() {
        this.logger.Log('Start')

        this.job = new CronJob(this.cronTime, () => this.HandleJob(), null, true, 'Asia/Taipei')
    }

    Stop() {
        this.logger.Log('Stop')

        this.job && this.job.stop()
    }

    HandleJob() {
        this.logger.Log('HandleJob')

        MongoService.DeleteOldTopiqs()
        VideoService.DeleteOldVideos()
    }
}

module.exports = MonthlyCleanupJob
