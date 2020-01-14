const fold = ([item]) => item
const log = id => val => {
    console.log(id, val)
    return val
}

module.exports = { fold, log }
