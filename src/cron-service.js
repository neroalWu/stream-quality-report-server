const CONFIGURATION = require('./configuration')
const Logger = require('./util/logger')
const CronJob = require('cron').CronJob
class CronService {
    constructor() {
        this.logger = new Logger('CronService')
    }

    StartJob(callback) {
        this.logger.Log('Start Job')
        return new CronJob(CONFIGURATION.CRON_TIME, () => callback(), null, true, 'Asia/Taipei')
    }

    StopJob(job) {
        this.logger.Log('Stop Job')

        job && job.stop && job.stop()
    }
}

const cronService = new CronService()

module.exports = cronService
