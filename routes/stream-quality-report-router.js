var express = require('express')
var router = express.Router()
var mongoDBInstance = require('../src/mongodb')
var ImageModel = require('../src/model/image-model')

function handleError(res, error) {
    res.status(500).send({
        errorCode: 500,
        message: error
    })
}

router.post('/get-topiq-response-list', async (req, res) => {
    try {
        const topiqList = await mongoDBInstance.GetTopiqList(req.body)

        res.send({ list: topiqList })
    } catch (error) {
        console.log(error)
        handleError(res, error)
    }
})

router.post('/get-screenshot', async (req, res) => {
    try {
        const { region, streamType, channel, timestamp } = req.body

        if (!region || !streamType || !channel || !timestamp) {
            handleError(res, 'parameter error')
            return
        }

        const id = `${region}_${streamType}_${channel}_${timestamp}`

        const imageModel = await ImageModel.findOne({ id: id })

        let base64Image = ''

        imageModel &&
            (base64Image = `data:image/png;base64,${imageModel.buffer.toString('base64')}`)

        res.send({ imageSrc: base64Image })
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
