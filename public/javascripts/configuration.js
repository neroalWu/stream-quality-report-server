
const CONFIGURATION = {}

CONFIGURATION.STREAM_LIST = [
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB02',
        url: 'rtmp://10.22.1.201/cb/BTCB02'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB02m',
        url: 'rtmp://10.22.1.201/cb/BTCB02m'
    }
]

CONFIGURATION.MONGODB_CONFIG = {
    URI: 'mongodb://localhost:27017/stream-quality-report-db',
    COLLECTION: 'topiq'
}

module.exports = CONFIGURATION