class Logger {
    constructor(logPrefix) {
        this.prefix = logPrefix
    }

    Log(...args) {
        console.log(`[${this.prefix}]:`, ...args)
    }
}

module.exports = Logger
