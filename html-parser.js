const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const { getDocument } = require('./util/jsdom')

/**
 * getDom
 *
 * @param url
 * @returns Promise<JSDOM>
 */
async function getDom(url) {
    const response = await fetch(url)
    const html = await response.text()
    const dom = new JSDOM(html)
    return dom
}

/**
 * getArticle
 *
 * @param dom
 * @param context
 * @returns JSDOM object
 */
function getArticle(dom, context) {
    const document = getDocument(dom)
    const article =
        document.querySelector('article') || document.querySelector('body')
    if (!article) {
        throw new Error(
            'cannot find article. describe the article explicitly',
            context
        )
    }
    return new JSDOM(article.outerHTML)
}

function removeToc(dom, context) {
    const document = getDocument(dom)
    const toc = document.querySelector('#toc')
    if (toc) toc.remove()
    return new JSDOM(document.documentElement.outerHTML)
}

/**
 * getHTML
 *
 * @param dom
 * @param context
 * @returns string
 */
function getBodyHtmlFromDom(dom, context) {
    return dom.window.document.querySelector('body').innerHTML
}

/**
 * getTitle
 *
 * @param dom
 * @param context
 * @returns string
 */
function getTitle(dom, context) {
    const document = getDocument(dom)
    const titleElement = dom.window.document.querySelector('h1')
    if (!titleElement) {
        console.log(`cannot find title at ${context.url}`)
        return ''
    }
    return titleElement.innerHTML
}

/**
 * removeTitle
 *
 * @param dom
 * @param context
 * @returns JSDOM object
 */
function removeTitle(dom, context) {
    const document = getDocument(dom)
    const titleElement = document.querySelector('h1')
    if (!titleElement) {
        return dom
    }
    titleElement.remove()
    return dom
}

/**
 * getMain
 *
 * @param dom
 * @param context
 * @returns JSDOM object
 */
function getMain(dom, context) {
    const document = getDocument(dom)
    const main =
        document.querySelector('main') ||
        document.querySelector("[role='main']") ||
        document.querySelector('#main') ||
        document.querySelector('body')
    if (!main) {
        throw new Error(
            `cannot find main. describe the main explicitly at ${context.url} ${dom.innerHTML}`,
            context
        )
    }
    return new JSDOM(main.outerHTML)
}

module.exports = {
    getArticle,
    getDom,
    getMain,
    getBodyHtmlFromDom,
    getTitle,
    removeTitle,
    removeToc,
}
