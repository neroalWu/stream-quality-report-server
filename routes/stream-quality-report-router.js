var express = require('express')
var router = express.Router()
const MongoService = require('../src/service/mongo-service')
const Util = require('../src/util/util')

function handleError(res, error) {
    res.status(500).send({
        errorCode: 500,
        message: error
    })
}

router.post('/get-topiq-data', async (req, res) => {
    try {
        const isValid = Util.ValidPostBody(req.body, ['region', 'streamType', 'bitrateType'])
        if (!isValid) {
            handleError(res, 'Missing required parameters.')
            return
        }
        const topiqList = await MongoService.GetTopiqList(req.body)

        res.send({ list: topiqList })
    } catch (error) {
        console.log(error)
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
