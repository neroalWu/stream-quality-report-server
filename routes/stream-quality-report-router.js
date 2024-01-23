var express = require('express');
var router = express.Router();

router.get('/get-all', async (req, res) => {
    try {
       const data = await req.app.locals.collection.find().toArray();

       res.send({
        errorCode: 0,
        list: data
        })
    } catch (error) {
        res.status(500).send({
            errorCode: 500,
            message: error
        })
    }
})

router.get('/get-by-region', async (req, res) => {

})

router.get('/get-by-stream-protocol', async (req, res) => {

})

router.get('/get-by-region-and-stream-protocol', async (req, res) => {

})

router.get('/get-by-channel', (req, res) => {

})


module.exports = router;
