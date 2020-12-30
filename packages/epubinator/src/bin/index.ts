#!/usr/bin/env node

import { main } from '../main'
import * as getopts from 'getopts'

import { printUsage, showVersion } from '../announcer'

const options = getopts(process.argv.slice(2), {
  alias: {
    multiurl: 'm',
    title: 't',
    path: 'p',
    version: 'v',
    author: 'a',
    help: 'h',
  },
  default: {
    multiurl: false,
    path: './',
    author: '',
  },
})

if (options.help) {
  printUsage()
  process.exit(0)
}

const website = options['_'][0]

const { multiurl, title, path, version, author } = options

if (version) {
  showVersion()
} else {
  if (!website) {
    console.log('missing url \n')
    printUsage()
    process.exit(0)
  }

  main(website, {
    multiurl,
    title: title || website,
    path: path || process.cwd(),
    author: author,
  })
}
