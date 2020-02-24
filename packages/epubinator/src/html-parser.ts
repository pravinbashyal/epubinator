import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { ContextType } from './models/ContextType'
import { getDocument } from './util/jsdom'

/**
 * getDom
 *
 * @param url
 * @returns Promise<JSDOM>
 */
async function getDom(url: string): Promise<JSDOM> {
  const response = await fetch(url)
  const html = await response.text()
  const dom = new JSDOM(html)
  return dom
}

/**
 * getArticle
 *
 * @param dom
 * @param context
 * @returns JSDOM object
 */
function getArticle(dom: JSDOM, context: ContextType = {}): JSDOM {
  const document = getDocument(dom)
  const article =
    document.querySelector('article') || document.querySelector('body')
  if (!article) {
    throw new Error(
      `cannot find article. describe the article explicitly ${JSON.stringify(
        context
      )}`
    )
  }
  return new JSDOM(article.outerHTML)
}

function removeToc(dom: JSDOM): JSDOM {
  const document = getDocument(dom)
  const toc = document.querySelector('#toc')
  if (toc) toc.remove()
  return new JSDOM(document.documentElement.outerHTML)
}

/**
 * getBodyHtmlFromDom
 *
 * @param {JSDOM} dom
 * @returns {string}
 */
function getBodyHtmlFromDom(dom: JSDOM): string {
  if (!dom) return ''
  return dom.window.document.querySelector('body').innerHTML
}

/**
 * getTitle
 *
 * @param {JSDOM} dom
 * @param {ContextType} context={}
 * @returns {string}
 */
function getTitle(dom: JSDOM, context: ContextType = {}): string | undefined {
  const document = getDocument(dom)
  const titleElement = document.querySelector('h1')
  if (!titleElement) {
    console.log(`cannot find title at ${context.url}`)
    return undefined
  }
  return titleElement.innerHTML
}

/**
 * removeTitle
 *
 * @param {JSDOM} dom
 * @returns {JSDOM}
 */
function removeTitle(dom: JSDOM): JSDOM {
  // TODO: immutability
  const document = getDocument(dom)
  const titleElement = document.querySelector('h1')
  if (!titleElement) {
    return dom
  }
  titleElement.remove()
  return dom
}

function getFallbackTitleContent(dom: JSDOM): HTMLElement {
  const title = getDocument(dom).querySelector('h1')
  return title.parentElement
}

/**
 * getMain
 *
 * @param {JSDOM} dom
 * @param {ContextType} context={}
 * @returns {JSDOM}
 */
function getMain(dom: JSDOM, context: ContextType = {}): JSDOM {
  const document = getDocument(dom)
  const fallbackTitleContent = getFallbackTitleContent(dom)
  const main =
    document.querySelector('main') ||
    document.querySelector('.content') ||
    document.querySelector("[role='main']") ||
    document.querySelector('#main') ||
    fallbackTitleContent ||
    document.querySelector('body')
  if (!main) {
    throw new Error(
      `cannot find main. describe the main explicitly at ${context.url} ${dom.window.document.documentElement.outerHTML}`
    )
  }
  return new JSDOM(main.outerHTML)
}

export {
  getArticle,
  getDom,
  getMain,
  getBodyHtmlFromDom,
  getTitle,
  removeTitle,
  removeToc,
}
