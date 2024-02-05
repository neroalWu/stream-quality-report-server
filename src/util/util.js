class Util {
    constructor() {}

    ValidPostBody(body, conditions) {
        const bodyKeys = Object.keys(body)

        for (const condition of conditions) {
            if (!bodyKeys.includes(condition)) {
                console.log(`valid post body failed. missing ${condition}`)
                return false
            }
        }

        return true
    }

    GetMean(numbers) {
        const sum = numbers.reduce((acc, num) => acc + num, 0)
        return sum / numbers.length
    }

    GetStandardDeviation(numbers) {
        const mean = calculateMean(numbers)
        const squaredDifferences = numbers.map((num) => Math.pow(num - mean, 2))
        const sumSquaredDifferences = squaredDifferences.reduce((acc, diff) => acc + diff, 0)
        const variance = sumSquaredDifferences / numbers.length
        const standardDeviation = Math.sqrt(variance)
        return standardDeviation
    }
}

const util = new Util()
module.exports = util
