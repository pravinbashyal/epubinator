import path from 'path'
import css from './styles'
import { generateBookChapters, generateSinglePageBook } from './book-generator'
import { OptionsType } from 'models/CLIOptionsType'
import { BookType } from './models/BookType'

const Epub = require('epub-gen')

/**
 * main
 *
 * @param url
 * @param options
 * @returns void
 */
async function main(url: string, options: Partial<OptionsType> = {}) {
  const { content, ...config } = options
  let book: Partial<BookType> = {}
  if (options.multiurl) {
    const chapters = await generateBookChapters(url)
    book.content = chapters
  } else {
    book = await generateSinglePageBook(url)
  }
  const option = {
    author: '',
    publisher: '',
    css,
    ...config,
    ...book,
    verbose: true,
  }
  new Epub(
    option,
    option.path +
      `${
        option.title.replace(/\//g, '-').replace(':', '') || 'output'
      }.epub`
  )
}

export { main }
