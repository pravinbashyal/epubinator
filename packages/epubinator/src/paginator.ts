import { JSDOM } from 'jsdom'

const getNextPageLink = async (
  dom: JSDOM,
  context: ContextType = {}
): Promise<string> => {
  const {
    window: { document },
  } = dom
  const next: HTMLLinkElement | undefined =
    document.querySelector('[rel="next"]') || document.querySelector('.next')
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

const a = new URLSearchParams()
