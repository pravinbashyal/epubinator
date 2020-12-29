import { emphasizedInfo, info, lineBreak, log } from './logger'

const version = require('../package').version

const showVersion = () => {
  log(
    emphasizedInfo(' Epubinator'),
    lineBreak,
    info('version: '),
    emphasizedInfo(version)
  )
}

export { showVersion }
