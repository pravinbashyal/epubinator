const fold = <T>([item]: T[]): T => item
const log = (id: string) => <T>(val: T) => {
    console.log(id, val)
    return val
}

export { fold, log }
