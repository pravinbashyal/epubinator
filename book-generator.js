const {
    getDom,
    getMain,
    getArticle,
    getTitle,
    getHTML,
    removeTitle,
} = require('./html-parser')

const { getNextPageLink } = require('./paginator')
const { stripNbsp, stripSpan } = require('./stripper')
const { fold } = require('./util/array')

const generateBook = async (url, chapters = []) => {
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
        .map(getHTML)
    const nextPageLink = await getNextPageLink(main)
    return await generateBook(
        nextPageLink,
        chapters.concat([
            {
                title: fold(title),
                data: fold(article),
            },
        ])
    )
}

module.exports = { generateBook }
