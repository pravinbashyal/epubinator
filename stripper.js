const stripNbsp = html => {
    const nbspRegex = /&nbsp;/gi
    return html.replace(nbspRegex, ' ')
}

const stripSpan = html => {
    // TODO: make one regex
    const spanOpen = /<span>/gi
    const spanClose = /<\/span>/gi
    return html.replace(spanOpen, '').replace(spanClose, '')
}

module.exports = { stripNbsp, stripSpan }
