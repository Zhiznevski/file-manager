import { createReadStream, createWriteStream } from "node:fs";
import { operationFailed } from "../../consts/errorMessages.js"
import { pipeline } from 'node:stream/promises';

export const copyFile = async(filePath, newDirectoryPath) => {
    try {
        await pipeline(createReadStream(filePath), createWriteStream(newDirectoryPath))
    } catch (err) {
        console.log(err)
        console.log(operationFailed)
    }
}