const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

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
    const {
        window: { document },
    } = dom
    const article = document.querySelector('article')
    if (!article) {
        throw new Error(
            'cannot find article. describe the article explicitly',
            context
        )
    }
    return new JSDOM(article.outerHTML)
}

/**
 * getHTML
 *
 * @param dom
 * @param context
 * @returns string
 */
function getHTML(dom, context) {
    return dom.window.document.documentElement.outerHTML
}

/**
 * getTitle
 *
 * @param dom
 * @param context
 * @returns string
 */
function getTitle(dom, context) {
    const {
        window: { document },
    } = dom
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
    const {
        window: { document },
    } = dom
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
    const {
        window: { document },
    } = dom
    const main =
        document.querySelector('main') ||
        document.querySelector("[role='main']")
    if (!main) {
        throw new Error(
            `cannot find main. describe the main explicitly at ${context.url} ${dom.innerHTML}`,
            context
        )
    }
    return new JSDOM(main.outerHTML)
}

module.exports = { getArticle, getDom, getMain, getHTML, getTitle, removeTitle }
