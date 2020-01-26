#!/usr/bin/env node

const { main } = require('../index')
const getopts = require('getopts')

const options = getopts(process.argv.slice(2), {
    alias: {
        multiurl: 'm',
        multipage: 'p',
    },
    default: {
        multiurl: false,
        multipage: true,
    },
})

const printUsage = () => {
    console.log(
        'usage: epubinator [-m|--multiurl=boolean] [-p|--multipage=boolean] url'
    )
    process.exit(0)
}

if (options.help) {
    printUsage()
}

const website = options['_'][0]

const { multiurl, multipage } = options

if (!website) {
    console.log('missing url \n')
    printUsage()
}

main(website, { multiurl, multipage })
