import { emphasizedInfo, info, lineBreak, log } from './logger'

const version = require('../package').version

const showVersion = () => {
  log(
    emphasizedInfo(' Epubinator'),
    lineBreak,
    info('version: '),
    emphasizedInfo(version),
    lineBreak,
  )
}

const printUsage = () => {
  log(
    info(' Usage: '),
    lineBreak,
    lineBreak,
    emphasizedInfo(' epubinator \\ '),
    lineBreak,
    emphasizedInfo('  [-m|--multiurl=boolean]  \\ '),
    lineBreak,
    emphasizedInfo('  [-p|--path=string] \\ '),
    lineBreak,
    emphasizedInfo('  [-t|--title=string] \\ '),
    lineBreak,
    emphasizedInfo('  [-a|--author=string] \\ '),
    lineBreak,
    emphasizedInfo('  url'),
    lineBreak
  )
}

export { showVersion, printUsage }
