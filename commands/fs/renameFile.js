import { rename } from 'node:fs/promises'
import { operationFailed } from '../../consts/errorMessages.js'

export const renameFile = async (oldPath, newPath) => {
    try {
        await rename(oldPath, newPath)
    } catch (err) {
        console.log(operationFailed)
    }
    }