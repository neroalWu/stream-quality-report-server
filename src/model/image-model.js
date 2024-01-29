const mongoose = require('mongoose')

const ImageModel = mongoose.model('Image', {
    id: String,
    buffer: Buffer
})

module.exports = ImageModel
