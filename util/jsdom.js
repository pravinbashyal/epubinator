function getDocument(dom) {
    const {
        window: { document },
    } = dom
    return document
}

module.exports = { getDocument }
