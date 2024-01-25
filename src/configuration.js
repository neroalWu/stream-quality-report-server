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
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB03',
        url: 'rtmp://10.22.1.201/cb/BTCB03'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB03m',
        url: 'rtmp://10.22.1.201/cb/BTCB03m'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB04',
        url: 'rtmp://10.22.1.201/cb/BTCB04'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB04m',
        url: 'rtmp://10.22.1.201/cb/BTCB04m'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB05',
        url: 'rtmp://10.22.1.201/cb/BTCB05'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB05m',
        url: 'rtmp://10.22.1.201/cb/BTCB05m'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB06',
        url: 'rtmp://10.22.1.201/cb/BTCB06'
    },
    {
        region: 'CEBU',
        server: 'http://localhost:3000/stream-quality-report/calculate_topiq',
        type: 'RTMP',
        channel: 'BTCB06m',
        url: 'rtmp://10.22.1.201/cb/BTCB06m'
    }
]

CONFIGURATION.MONGODB_CONFIG = {
    URI: 'mongodb://localhost:27017/stream-quality-report-db',
    COLLECTION: 'topiq'
}

module.exports = CONFIGURATION
