import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { getDocument } from './util/jsdom'
import { log, info, success, lineBreak, emphasizedInfo } from './logger'

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
    emphasizedInfo(originUrl.origin),
    lineBreak,
    success('link:'),
    emphasizedInfo(link)
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
