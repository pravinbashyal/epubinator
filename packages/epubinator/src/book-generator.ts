import { compose, either } from 'ramda'
import {
  getDom,
  getMain,
  getTitle,
  getArticle,
  removeTitle,
  getBodyHtmlFromDom,
  removeToc,
} from './html-parser'
import { stripNbsp, stripSpan } from './stripper'
import { getNextPageLink } from './paginator'
import { JSDOM } from 'jsdom'
import { getDocument } from './util/jsdom'
import { ContextType } from './models/ContextType'
import { ChapterType } from './models/BookType'

const generateBookChapters = async (
  url: string,
  chapters: ChapterType[] = []
): Promise<ChapterType[] | typeof generateBookChapters> => {
  if (!url) return chapters
  const dom = await getDom(url)
  const main = getMain(dom, {
    url,
  })
  const title = compose(stripNbsp, stripSpan)(getTitle(main))
  const article = getBodyHtmlFromDom(compose(getArticle, removeTitle)(main))
  const nextPageLink = await getNextPageLink(main)
  return await generateBookChapters(
    nextPageLink,
    chapters.concat([
      {
        title: title,
        data: article,
      },
    ])
  )
}

const generateSinglePageBook = async (url: string) => {
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
    title: title && compose(stripNbsp, stripSpan)(title),
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

export { generateBookChapters, generateSinglePageBook }
