const CONFIGURATION = require('./configuration');

const CronJob = require('cron').CronJob;

function StartJob(callback) {
    console.log('StartJob')
    return new CronJob(CONFIGURATION.CRON_TIME, () => callback(), null, true, 'Asia/Taipei');
}

function StopJob(job) {
    console.log('StopJob');
    if (job && job.stop) {
        job.stop();
    }
}

const cron = {};
cron.StartJob = StartJob;
cron.StopJob = StopJob;

module.exports = cron