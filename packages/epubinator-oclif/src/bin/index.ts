#!/usr/bin/env node

import { main } from '../main'
import * as getopts from 'getopts'

const options = getopts(process.argv.slice(2), {
  alias: {
    multiurl: 'm',
    multipage: 'p',
    title: 't',
    output: 'o'
  },
  default: {
    multiurl: false,
    multipage: true,
    default: '',
    output: './'
  },
})

const printUsage = () => {
  console.log(
    'usage: epubinator [-m|--multiurl=boolean] [-p|--multipage=boolean] [-o|--output=string] url'
  )
  process.exit(0)
}

if (options.help) {
  printUsage()
}

const website = options['_'][0]

const { multiurl, multipage, title, output } = options

if (!website) {
  console.log('missing url \n')
  printUsage()
}

main(website, { multiurl, multipage, title: title || website, output : output ||  process.cwd() })
