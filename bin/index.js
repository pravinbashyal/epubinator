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
console.log(options)

const website = options['_'][0]

const { multiurl, multipage } = options

if (!website) {
    console.log('Please provide a url')
}

main(website, { multiurl, multipage })
