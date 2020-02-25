import { blue, red, green, bold } from 'chalk'
import { compose } from 'ramda'

export const info = blue
export const error = red
export const success = green
export const emphasize = bold
export const lineBreak = '\n'
export const log = (...args) => {
  console.log(args.join(' '))
}
export const boldInfo = compose(blue, emphasize)
