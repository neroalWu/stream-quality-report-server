const CONFIGURATION = {}

const DEBUG = true

const DEBUG_SERVER_URL = 'http://localhost:3000/stream-quality-report/calculate_topiq'

const REGION_TYPE = {
    CEBU: 'CEBU'
}

const STREAM_TYPE = {
    RTMP: 'RTMP',
    FLV: 'FLV'
}

const BITRATE_TYPE = {
    HIGH: 'HIGH',
    LOW: 'LOW'
}

const SERVER_URL = {
    [STREAM_TYPE.RTMP]: DEBUG ? DEBUG_SERVER_URL : 'http://10.20.30.130:8000/rtmp/calculate_topiq'
}

const SOURCE_URL = {
    [STREAM_TYPE.RTMP]: 'rtmp://10.22.1.201/'
}

const SOURCE_APPEND = {
    [REGION_TYPE.CEBU]: 'cb/'
}

CONFIGURATION.CRON_TIME = DEBUG ? '*/10 * * * * *' : '*/10 11-18 * * 1-5'

CONFIGURATION.STREAM_LIST = [
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.LOW,
        channel: 'BTCB02',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.LOW,
        channel: 'BTCB03',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.LOW,
        channel: 'BTCB04',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.LOW,
        channel: 'BTCB05',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.LOW,
        channel: 'BTCB06',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.HIGH,
        channel: 'BTCB02m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.HIGH,
        channel: 'BTCB03m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.HIGH,
        channel: 'BTCB04m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.HIGH,
        channel: 'BTCB05m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        bitrateType: BITRATE_TYPE.HIGH,
        channel: 'BTCB06m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
]

CONFIGURATION.MONGODB_CONFIG = {
    URI: 'mongodb://localhost:27017/stream-quality-report-db',
    COLLECTION: 'topiq'
}

module.exports = CONFIGURATION
