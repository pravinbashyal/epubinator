const getNextPageLink = async dom => {
    const {
        window: { document },
    } = dom
    const next = document.querySelector('[rel="next"]')
    if (!next) {
        return
    }
    const link = next.href
    if (!link) return
    return link
}

module.exports = { getNextPageLink }
