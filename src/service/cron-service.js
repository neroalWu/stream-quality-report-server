const CONFIGURATION = require('../configuration')
const Logger = require('../util/logger')

const TopiqRecordJob = require('../cronjobs/topiq-record-job')
const MonthlyCleanupJob = require('../cronjobs/monthly-cleanup-job')

class CronService {
    constructor() {
        this.jobs = [
            TopiqRecordJob.Create(CONFIGURATION.CRON_TOPIQ_RECORD),
            MonthlyCleanupJob.Create(CONFIGURATION.CRON_MONTLY_CLEANUP)
        ]

        this.logger = new Logger('CronService')
    }

    Start() {
        this.logger.Log('Start')

        this.jobs.forEach((job) => {
            job.Start && job.Start()
        })
    }

    Stop() {
        this.logger.Log('Stop')

        this.jobs.forEach((job) => {
            job.Stop && job.Stop()
        })
    }
}

const cronService = new CronService()
module.exports = cronService
