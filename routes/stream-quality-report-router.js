const express = require('express')
const router = express.Router()
const MongoService = require('../src/service/mongo-service')
const Util = require('../src/util/util')
const Logger = require('../src/util/logger')

const logger = new Logger('StreamQualityReportRouter')

function handleError(res, error) {
    res.status(500).send({
        errorCode: 500,
        message: error
    })
}

router.post('/get-topiq-data', async (req, res) => {
    try {
        const isValid = Util.ValidPostBody(req.body, ['region', 'streamType', 'resolution'])
        if (!isValid) {
            handleError(res, 'Missing required parameters.')
            return
        }
        const topiqDataList = await MongoService.GetTopiqDataList(req.body)

        res.send({ list: topiqDataList })
    } catch (error) {
        logger.Error('error get-topiq-data', error)
        handleError(res, error)
    }
})

router.post('/get-image', async (req, res) => {
    try {
        const isValid = Util.ValidPostBody(req.body, ['region', 'streamType', 'channel', 'timestamp'])
        if (!isValid) {
            handleError(res, 'Missing required parameters.')
            return
        }
        const { region, streamType, channel, timestamp } = req.body

        const id = `${region}_${streamType}_${channel}_${timestamp}`
        const base64Image = await MongoService.GetImageBase64(id)

        res.send({ src: base64Image })
    } catch (error) {
        logger.Error('error get-image', error)
        console.log(error)
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
