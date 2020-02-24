import { JSDOM } from 'jsdom'

const getNextPageLink = async (dom: JSDOM): Promise<string> => {
    const {
        window: { document },
    } = dom
    const next: HTMLLinkElement = document.querySelector('[rel="next"]')
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
