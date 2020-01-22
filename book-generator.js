const {
    getDom,
    getMain,
    getArticle,
    getTitle,
    getBodyHtmlFromDom,
    removeTitle,
    removeToc,
} = require('./html-parser')
const { getDocument } = require('./util/jsdom')
const { concat } = require('ramda')

const { getNextPageLink } = require('./paginator')
const { stripNbsp, stripSpan } = require('./stripper')
const { fold, log } = require('./util/array')
const { JSDOM } = require('jsdom')

const generateBookChapters = async (url, chapters = []) => {
    if (!url) return chapters
    const dom = await getDom(url)
    const main = getMain(dom, {
        url,
    })
    const title = [main]
        .map(getTitle)
        .map(stripNbsp)
        .map(stripSpan)
    const article = [main]
        .map(getArticle)
        .map(removeTitle)
        .map(getBodyHtmlFromDom)
    const nextPageLink = await getNextPageLink(main)
    return await generateBookChapters(
        nextPageLink,
        chapters.concat([
            {
                title: fold(title),
                data: fold(article),
            },
        ])
    )
}

const generateSinglePageBook = async url => {
    if (!url) return chapters
    const dom = await getDom(url)
    const main = getMain(dom, {
        url,
    })
    const title = [main]
        .map(getTitle)
        .map(stripNbsp)
        .map(stripSpan)
    const toc = [generateToc(main, { id: 'toc' })].map(getBodyHtmlFromDom)
    const article = [main]
        .map(getArticle)
        .map(removeToc)
        .map(removeTitle)
        .map(getBodyHtmlFromDom)
    // TODO: could be antipattern, review
    const data = article.map(concat(fold(toc)))
    return {
        title,
        content: [
            {
                data: fold(data),
            },
        ],
    }
}

// TODO write specific function
function generateToc(dom, context) {
    const document = getDocument(dom)
    const tableOfContent = document.querySelector(`#${context.id}`)
    if (!tableOfContent) return
    return new JSDOM(tableOfContent.outerHTML)
}

module.exports = { generateBookChapters, generateSinglePageBook }
