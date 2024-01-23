var express = require('express')
var router = express.Router()

function handleSuccess(res, data) {
    res.send({
        errorCode: 0,
        list: data
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
        const data = await req.app.locals.collection.find().toArray()

        handleSuccess(res, data)
    } catch (error) {
        handleError(res, error)
    }
})

router.get('/get-by-region', async (req, res) => {})

router.get('/get-by-stream-protocol', async (req, res) => {})

router.get('/get-by-region-and-stream-protocol', async (req, res) => {})

router.get('/get-by-channel', (req, res) => {})

module.exports = router
