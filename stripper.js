const stripNbsp = html => {
    const nbspRegex = /&nbsp;/gi
    return html.replace(nbspRegex, ' ')
}

const stripSpan = html => {
    const spanRegex = /<\s*span[^>]*>|<\/\s*span[^>]*>/gi
    return html.replace(spanRegex, '')
}

module.exports = { stripNbsp, stripSpan }
