import { JSDOM } from 'jsdom'

function getDocument(dom: JSDOM): Document {
    const {
        window: { document },
    } = dom
    return document
}

export { getDocument }
