const STREAM_QUALITY_REPORT = {
    SUCCESS: 0, //"success"
    MISSING_REGION: 1, //"missing query region"
    MISSING_STREAM_TYPE: 2, //"missing query stream type"
    MISSING_REGION_AND_STREAM_TYPE: 3, // 'missing query region and stream type'
    MISSING_CHANNEL: 4, //'missing query channel'
}

const ERRORCODE = {}
ERRORCODE.STREAM_QUALITY_REPORT = STREAM_QUALITY_REPORT

module.exports = ERRORCODE
