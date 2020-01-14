const fs = require('fs')
const Epub = require('epub-gen')
const path = require('path')
const css = require('./styles')
const { generateBook, generateSinglePageBook } = require('./book-generator')
const html = fs.readFileSync('./test.html', { encoding: 'utf-8' })
const { JSDOM } = require('jsdom')

/**
 * main
 *
 * @param url
 * @param options
 * @returns void
 */
async function main(url, options = {}) {
    const { content, ...config } = options
    // const chapters = await generateBook(url)
    const book = await generateSinglePageBook(url)
    const option = {
        author: '',
        publisher: '',
        css,
        ...config,
        ...book,
    }
    const dir = path.resolve(process.cwd())

    new Epub(option, dir + `/dist/${book.title}.epub`)
}

module.exports = { main }
