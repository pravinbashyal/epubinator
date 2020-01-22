const fs = require('fs')
const Epub = require('epub-gen')
const path = require('path')
const css = require('./styles')
const {
    generateBookChapters,
    generateSinglePageBook,
} = require('./book-generator')
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
    let book = {}
    if (options.multiurl) {
        const chapters = await generateBookChapters(url)
        book.content = chapters
    } else {
        book = await generateSinglePageBook(url)
    }
    const option = {
        title: '',
        author: '',
        publisher: '',
        css,
        ...config,
        ...book,
    }
    const dir = path.resolve(process.cwd())

    new Epub(option, dir + `/dist/${option.title}.epub`)
}

module.exports = { main }
