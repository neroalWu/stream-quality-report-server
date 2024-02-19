const express = require('express')
const router = express.Router()
const MongoService = require('../src/service/mongo-service')
const VideoService = require('../src/service/video-service')
const Util = require('../src/util/util')
const Logger = require('../src/util/logger')

const logger = new Logger('StreamQualityReportRouter')

function handleError(res, error) {
    res.status(500).send({
        errorCode: 500,
        message: error
    })
}

router.post('/get-api-summary', async (req, res) => {
    try {
        const isValid = Util.ValidPostBody(req.body, ['region', 'streamType', 'resolution', 'startTime', 'endTime'])
        if (!isValid) {
            handleError(res, 'Missing required parameters.')
            return
        }

        const summarys = await MongoService.GetSummarys(req.body)

        res.send({ summarys: summarys })
    } catch (error) {
        logger.Error('error get-api-summary ', error)
        handleError(res, error)
    }
})

router.post('/get-api-details', async (req, res) => {
    try {
        const isValid = Util.ValidPostBody(req.body, ['region', 'streamType', 'channel', 'startTime', 'endTime'])
        if (!isValid) {
            handleError(res, 'Missing required parameters.')
            return
        }

        const detail = await MongoService.GetDetail(req.body);

        res.send({ detail: detail })
    } catch (error) {
        logger.Error('error get-api-details', error)
        handleError(res, error)
    }
})

router.post('/get-api-video', async (req, res) => {
    try {
        const isValid = Util.ValidPostBody(req.body, ['region', 'streamType', 'resolution', 'channel', 'timestamp'])
        if (!isValid) {
            handleError(res, 'Missing required parameters.')
            return
        }

        const videoURL = await VideoService.GetVideoURL(req.body);

        res.send({ videoURL: videoURL })
    } catch (error) {
        logger.Error('error get-topiq-data', error)
        handleError(res, error)
    }
})

router.post('/calculate_topiq', (req, res) => {
    res.send({
        topiq_nr: Math.random(),
        'topiq_nr-flive': Math.random(),
        'topiq_nr-spaq': Math.random()
    })
})

module.exports = router
