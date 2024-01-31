class Util {
    constructor() {}

    ValidPostBody(body, conditions) {
        const bodyKeys = Object.keys(body)

        for (const condition of conditions) {
            if (!bodyKeys.includes(condition)) {
                console.log(`valid post body failed. missing ${condition}`)
                return false;
            }
        }

        return true
    }
}

const util = new Util()
module.exports = util