/**
 * stripNbsp
 *
 * @param {string} html
 * @returns {string}
 */
function stripNbsp(html: string): string {
    const nbspRegex = /&nbsp;/gi
    return html.replace(nbspRegex, ' ')
}

/**
 * stripSpan
 *
 * @param {string} html
 * @returns {string}
 */
function stripSpan(html: string): string {
    const spanRegex = /<\s*span[^>]*>|<\/\s*span[^>]*>/gi
    return html.replace(spanRegex, '')
}

export { stripNbsp, stripSpan }
