import { createReadStream } from 'node:fs'
import { operationFailed } from '../../consts/errorMessages.js'

export const readFile = async (filePath) => {
    try {
        createReadStream(filePath).pipe(process.stdout)
    } catch (err) {
        console.log(err)
        console.log(operationFailed)
    }
    }