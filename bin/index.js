const { main } = require('../index')

const website = process.argv[2]
if (!website) {
    console.log('Please provide a url')
}

main(website)
