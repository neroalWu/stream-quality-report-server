var express = require('express')
var router = express.Router()
var ERRORCODE = require('../src/errorcode').STREAM_QUALITY_REPORT
var mongoDBInstance = require('../src/mongodb')
var ImageModel = require('../src/image-model')

function handleError(res, error) {
    res.status(500).send({
        errorCode: 500,
        message: error
    })
}

router.get('/get-stream-quality-report-response', async (req, res) => {
    try {
        const queryRegion = req.query.region ? req.query.region : ''
        const queryStreamType = req.query.streamType ? req.query.streamType : ''
        const queryBitrateType = req.query.bitrateType ? req.query.bitrateType : ''

        const topiqList = await mongoDBInstance.GetTopiqList(
            queryRegion,
            queryStreamType,
            queryBitrateType
        )

        res.send({
            errorCode: ERRORCODE.SUCCESS,
            list: topiqList
        })
    } catch (error) {
        handleError(res, error)
    }
})

router.get('/get-screenshot', async (req, res) => {
    try {
        const { region, streamType, channel, timestamp } = req.query
        const queryRegion = region ? region : ''
        const queryStreamType = streamType ? streamType : ''
        const queryChannel = channel ? channel : ''
        const queryTimestamp = timestamp ? timestamp : ''
        const id = `${queryRegion}_${queryStreamType}_${queryChannel}_${queryTimestamp}`

        const data = await ImageModel.findOne({ id : id})
        console.log(id, data)

        res.send(data)
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
