import { createReadStream, createWriteStream } from "node:fs";
import { operationFailed } from "../../consts/errorMessages.js"
import { pipeline } from 'node:stream/promises';
import { rm } from "node:fs/promises";

export const moveFile = async(filePath, newDirectoryPath) => {
    try {
        await pipeline(createReadStream(filePath), createWriteStream(newDirectoryPath))
        await rm(filePath);
    } catch (err) {
        console.log(operationFailed)
    }
}