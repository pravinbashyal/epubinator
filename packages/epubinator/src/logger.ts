import { blue, red, green, bold } from 'chalk'

export const info = blue
export const error = red
export const success = green
export const emphasize = bold
export const lineBreak = '\n'
export const log = (...args: string[]) => {
  console.log(args.join(' '))
}
export const emphasizedInfo = blue.bold
