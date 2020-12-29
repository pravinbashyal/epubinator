import { JSDOM } from 'jsdom'
import { ContextType } from './models/ContextType'

const getNextPageLink = async (
  dom: JSDOM,
  context: ContextType = {}
): Promise<string> => {
  const {
    window: { document },
  } = dom
  const next: HTMLLinkElement | HTMLAnchorElement | undefined =
    document.querySelector('[rel="next"]') ||
    document.querySelector('.next') ||
    document.querySelector('[name="next"]') ||
    document.querySelector('[name="NEXT"]') ||
    document.querySelector('[name="Next"]') ||
    linkWithInnerTextNext(document)
  if (!next) {
    return
  }
  if (!next.href) {
    console.log('cannot find next page')
    return
  }
  const link = next.href
  if (!link) return
  return link
}

export { getNextPageLink }

const linkWithInnerTextNext = (
  document: Document
): HTMLAnchorElement | undefined => {
  const nextElement = Array.from(
    document.querySelectorAll('p, a, span, div')
  ).find(elementWithNextInTree)
  return nextElement && nextElement.closest('a')
}

const leafHasNext = (node: Element) => {
  const hasText = (nodeCur: Element) => /next/i.test(nodeCur.textContent)
  const nodeHasText = hasText(node)
  const childrenDontHaveText = Array.from(node.children).every(
    (child) => !hasText(child)
  )

  return nodeHasText && childrenDontHaveText
}

function elementWithNextInTree(element: Element) {
  return (
    leafHasNext(element) &&
    element.textContent
      .split(' ')
      .find((text) => text.toLowerCase() === 'next') &&
    element.textContent.split(' ').length < 4 &&
    element.closest('a')
  )
}
