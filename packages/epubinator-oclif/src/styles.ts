import { readFileSync } from 'fs'

console.log()
const content = readFileSync(__dirname + '/textfiles/stylestext.css', {
  encoding: 'utf-8',
})

export default content
