const Epub = require('epub-gen')
const path = require('path')
const css = require('./styles')
const { generateBook } = require('./book-generator')

const main = async () => {
    const website = process.argv[2]
    if (!website) {
        console.log('Please provide a url')
    }
    const chapters = await generateBook(website)
    const option = {
        title: ' A Foundation Course in Reading German ',
        author:
            'Howard Martin, revised and expanded as an open online textbook by Alan Ng',
        publisher: 'University of Wisconsin',
        css,
        content: chapters,
    }
    const dir = path.resolve(process.cwd())

    new Epub(option, dir + '/hello.epub')
}

main()
