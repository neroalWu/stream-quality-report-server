const CONFIGURATION = {}

CONFIGURATION.DEBUG = true

CONFIGURATION.HOST_URL = CONFIGURATION.DEBUG
    ? 'http://localhost:3000/'
    : 'http://10.20.30.228:3000/'

const REGION_TYPE = {
    CEBU: 'CEBU'
}

const STREAM_TYPE = {
    RTMP: 'RTMP',
    FLV: 'FLV'
}

const RESOLUTION = {
    SD: '480p',
    HD: '720p',
    FULL_HD: '1080p'
}

// http://10.20.30.130:8000/rtmp/calculate_topiq
const SERVER_URL = {
    [STREAM_TYPE.RTMP]: CONFIGURATION.DEBUG
        ? 'http://localhost:3000/stream-quality-report/calculate_topiq'
        : 'http://10.20.30.228:3000/stream-quality-report/calculate_topiq'
}

const SOURCE_URL = {
    [STREAM_TYPE.RTMP]: 'rtmp://10.22.1.201/'
}

const SOURCE_APPEND = {
    [REGION_TYPE.CEBU]: 'cb/'
}

// */10 11-18 * * 1-5
CONFIGURATION.CRON_TIME = CONFIGURATION.DEBUG ? '*/1 * * * *' : '*/10 * * * *'
CONFIGURATION.CRON_MONTLY_CLEANUP = CONFIGURATION.DEBUG ? '*/1 * * * *' : '0 0 1 * *'

CONFIGURATION.STREAM_LIST = [
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.HD,
        channel: 'BTCB02m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.HD,
        channel: 'BTCB03m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.HD,
        channel: 'BTCB04m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.HD,
        channel: 'BTCB05m',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.FULL_HD,
        channel: 'BTCB02',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.FULL_HD,
        channel: 'BTCB03',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.FULL_HD,
        channel: 'BTCB04',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    },
    {
        region: REGION_TYPE.CEBU,
        server: SERVER_URL[STREAM_TYPE.RTMP],
        streamType: STREAM_TYPE.RTMP,
        resolution: RESOLUTION.FULL_HD,
        channel: 'BTCB05',
        source: `${SOURCE_URL[STREAM_TYPE.RTMP]}${SOURCE_APPEND[REGION_TYPE.CEBU]}`
    }
]

CONFIGURATION.MONGODB_URL = 'mongodb://127.0.0.1:27017/stream-quality-report-db'

CONFIGURATION.MODEL_FIELD = {
    NR: 'topiq_nr',
    FLIVE: 'topiq_nr-flive',
    SPAQ: 'topiq_nr-spaq',
    TIMESTAMP: 'timestamp'
}

module.exports = CONFIGURATION
