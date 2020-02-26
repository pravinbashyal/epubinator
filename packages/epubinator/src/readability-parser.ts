import ReadabilityType from 'mozilla-readability'
import { JSDOM } from 'jsdom'

const Readability = require('readability')

export const getReadableArticle = (dom: JSDOM): ReadabilityType.ParseResult => {
  const readabilityArticle: ReadabilityType = new Readability(
    dom.window.document
  )
  const article = readabilityArticle.parse()
  return article
}
