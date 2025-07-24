import { createReadStream } from 'node:fs'
import { operationFailed } from '../../consts/errorMessages.js'
import { finished, pipeline } from 'node:stream/promises'

export const readFile = async (filePath) => {
    try {
        const rs = createReadStream(filePath)
        rs.pipe(process.stdout)
        await finished(rs)
    } catch (err) {
        console.log(operationFailed)
    }
    }