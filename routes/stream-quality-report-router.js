var express = require('express')
var router = express.Router()
var ERRORCODE = require('../src/errorcode').STREAM_QUALITY_REPORT
var mongoDBInstance = require('../src/mongodb')

function handleSuccess(res, data) {
    res.send({
        errorCode: ERRORCODE.SUCCESS,
        list: data
    })
}

function handleQueryError(res, errorCode, errorMessage) {
    res.send({
        errorCode: errorCode,
        message: errorMessage
    })
}

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

        const topiqList = await mongoDBInstance.GetTopiqList(queryRegion, queryStreamType, queryBitrateType)
        handleSuccess(res, topiqList)
    } catch (error) {
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
