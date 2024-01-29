const mongoose = require('mongoose')

const TopiqModel = mongoose.model('topiq', {
    region: String,
    streamType: String,
    bitrateType: String,
    channel: String,

    topiq_nr: Number,
    'topiq_nr-flive': Number,
    'topiq_nr-spaq': Number,
    timestamp: Number
})

module.exports = TopiqModel;
