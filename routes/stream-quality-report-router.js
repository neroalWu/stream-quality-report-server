var express = require('express')
var router = express.Router()
var ERRORCODE = require('../public/javascripts/errorcode').STREAM_QUALITY_REPORT
var mongoDBInstance = require('../public/javascripts/mongodb')

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

router.get('/get-all', async (req, res) => {
    try {
        const result = await mongoDBInstance.GetAll()
        console.log(result)
        handleSuccess(res, result)
    } catch (error) {
        handleError(res, error)
    }
})

router.get('/get-by-region', async (req, res) => {
    try {
        const queryRegion = req.query.region

        if (!queryRegion) {
            handleQueryError(res, ERRORCODE.MISSING_REGION, 'query string missing region')
            return
        }

        const result = await mongoDBInstance.GetByRegion(queryRegion)

        handleSuccess(res, result)
    } catch (error) {
        handleError(res, error)
    }
})

router.get('/get-by-stream-type', async (req, res) => {
    try {
        const queryStreamType = req.query.type

        if (!queryStreamType) {
            handleQueryError(res, ERRORCODE.MISSING_STREAM_TYPE, 'query string missing type')
            return
        }

        const result = await mongoDBInstance.GetByStreamType(queryStreamType)

        handleSuccess(res, result)
    } catch (error) {
        handleError(res, error)
    }
})

router.get('/get-by-region-and-stream-type', async (req, res) => {
    try {
        const queryRegion = req.query.region
        const queryStringType = req.query.type

        if (!queryRegion && !queryStringType) {
            handleQueryError(
                res,
                ERRORCODE.MISSING_REGION_AND_STREAM_TYPE,
                'query string missing region and type'
            )
            return
        }

        if (!queryRegion) {
            handleQueryError(res, ERRORCODE.MISSING_REGION, 'query string missing region')
            return
        }

        if (!queryStringType) {
            handleQueryError(res, ERRORCODE.MISSING_STREAM_TYPE, 'query string missing type')
            return
        }

        const result = await mongoDBInstance.GetByRegionAndStreamType(queryRegion, queryStringType)

        handleSuccess(res, result)
    } catch (error) {
        handleError(res, error)
    }
})

router.get('/get-by-channel', async (req, res) => {
    try {
        const queryChannel = req.query.channel

        if (!queryChannel) {
            handleQueryError(res, ERRORCODE.MISSING_CHANNEL, 'query string missing channel')
            return
        }

        const result = await mongoDBInstance.GetByChannel(queryChannel)

        handleSuccess(res, result)
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
