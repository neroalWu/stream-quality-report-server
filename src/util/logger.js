class Logger {
    constructor(logPrefix) {
        this.prefix = logPrefix
    }

    Log(...args) {
        console.log(`[${this.prefix}]:`, ...args)
    }

    Error(...args) {
        console.error(`[${this.prefix}]`, ...args)
    }
}

module.exports = Logger
