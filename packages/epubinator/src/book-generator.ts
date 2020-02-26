import { compose } from 'ramda'
import {
  getDom,
  getMain,
  getTitle,
  getArticle,
  removeTitle,
  getBodyHtmlFromDom,
  removeToc,
  generateLink,
} from './html-parser'
import { stripNbsp, stripHtmlAttributes } from './stripper'
import { getNextPageLink } from './paginator'
import { JSDOM } from 'jsdom'
import { getDocument } from './util/jsdom'
import { ContextType } from './models/ContextType'
import { ChapterType } from './models/BookType'
import { log, info, emphasizedInfo } from './logger'
import { ParseResult } from 'mozilla-readability'
import { getReadableArticle } from 'readability-parser'

type GenerateBookChapterFunction = (
  url: string,
  chapters?: ChapterType[]
) => Promise<ChapterType[] | GenerateBookChapterFunction>

export const generateBookChapters: GenerateBookChapterFunction = async (
  url: string,
  chapters: ChapterType[] = []
) => {
  if (!url) return chapters
  log(info('Downloading page for'), emphasizedInfo(url))
  const urlInstance = new URL(url)
  const dom = await getDom(url)
  const readableArticle: ParseResult = getReadableArticle(dom)
  const nextPageHref = await getNextPageLink(dom)
  return await generateBookChapters(
    generateLink(urlInstance, nextPageHref),
    chapters.concat([
      {
        title: readableArticle.title,
        data: readableArticle.content,
      },
    ])
  )
}

export const generateSinglePageBook = async (url: string) => {
  const dom = await getDom(url)
  const main = getMain(dom, {
    url,
  })
  const title = getTitle(dom, { url })
  const toc = getBodyHtmlFromDom(generateToc(main, { id: 'toc' }))
  const article = getBodyHtmlFromDom(
    compose(getArticle, removeToc, removeTitle)(main)
  )
  const data = toc.concat(article)
  return {
    title: title && compose(stripNbsp, stripHtmlAttributes)(title),
    content: [
      {
        data: data,
      },
    ],
  }
}

// TODO write specific function
function generateToc(dom: JSDOM, context: ContextType = {}) {
  const document = getDocument(dom)
  const tableOfContent = document.querySelector(`#${context.id}`)
  if (!tableOfContent) return
  return new JSDOM(tableOfContent.outerHTML)
}
