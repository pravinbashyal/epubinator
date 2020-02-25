import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { ContextType } from './models/ContextType'
import { getDocument } from './util/jsdom'
import { log, info, boldInfo, success, lineBreak } from './logger'

/**
 * getDom
 *
 * @param url
 * @returns Promise<JSDOM>
 */
export async function getDom(url: string): Promise<JSDOM> {
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
export function getArticle(dom: JSDOM, context: ContextType = {}): JSDOM {
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

export function removeToc(dom: JSDOM): JSDOM {
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
export function getBodyHtmlFromDom(dom: JSDOM): string {
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
export function getTitle(dom: JSDOM, context: ContextType = {}): string {
  const document = getDocument(dom)
  const titleElement = document.querySelector('h1')
  if (!titleElement) {
    console.log(`cannot find title at ${context.url}`)
    return ''
  }
  return titleElement.innerHTML
}

/**
 * removeTitle
 *
 * @param {JSDOM} dom
 * @returns {JSDOM}
 */
export function removeTitle(dom: JSDOM): JSDOM {
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
export function getMain(dom: JSDOM, context: ContextType = {}): JSDOM {
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

/**
 * generateLink
 *
 * @param {string} origin
 * @param {string} link
 * @returns {string}
 */
export function generateLink(originUrl: URL, link: string): string | undefined {
  if (!link) return
  log(
    info('Generating link at'),
    success('origin:'),
    boldInfo(originUrl.origin),
    lineBreak,
    success('link:'),
    boldInfo(link)
  )
  try {
    new URL(link)
    return link
  } catch (e) {
    if (isAbsoluteHref(link)) {
      return `${originUrl.origin}/${link}`
    }
    return `${stripCurrentPageFromUrl(originUrl.href)}/${link}`
  }
}

const stripCurrentPageFromUrl = (url: string) => {
  return (
    url
      // .replace(/(^\w+:|^)\/\//, '')
      .split('/')
      .slice(0, -1)
      .join('/')
  )
}

const isAbsoluteHref = (link: string): boolean => {
  return link && link[0] === '/'
}
