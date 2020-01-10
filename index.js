const Epub = require('epub-gen')
const path = require('path')
const css = require('./styles')
const { generateBook } = require('./book-generator')

/**
 * main
 *
 * @param url
 * @param options
 * @returns void
 */
async function main(url, options = {}) {
    const { content, ...config } = options
    const chapters = await generateBook(url)
    const option = {
        title: ' A Foundation Course in Reading German ',
        author:
            'Howard Martin, revised and expanded as an open online textbook by Alan Ng',
        publisher: 'University of Wisconsin',
        css,
        ...config,
        content: chapters,
    }
    const dir = path.resolve(process.cwd())

    new Epub(option, dir + '/dist/hello.epub')
}

module.exports = { main }
