const CONFIGURATION = require('../src/configuration')
var mongoose = require('mongoose');
mongoose.connect(CONFIGURATION.MONGODB_CONFIG.URI);

var ImageModel = mongoose.model('Image', {
    id: String,
    data: Buffer,
})

module.exports = ImageModel;