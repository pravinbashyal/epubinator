const origin = (url: string) => {
  const urlObj = new URL(url)
  return urlObj.origin
}

const absoluteToLink = ({
  url,
  origin: originUrl,
}:
  | { url: string; origin?: undefined }
  | { url?: undefined; origin: string }) => (link: string) => {
  if (url) {
    const urlObj = new URL(`${normalizeEndingSlash(origin(url))}${link}`)
    return urlObj.href
  }
  if (originUrl) {
    const urlObj = new URL(`${normalizeEndingSlash(originUrl)}${link}`)
    return urlObj.href
  }
}

const normalizeEndingSlash = (url: string) =>
  url[-1] === '/' ? url : `${url}/`

const isAbsoluteHref = (link: string): boolean => {
  return (link && link[0] === '/') || link[0] === '.'
}

export { origin, absoluteToLink, isAbsoluteHref }
