import { operationFailed } from "../../consts/errorMessages.js"
import { rm } from "node:fs/promises";

export const deleteFile = async(filePath) => {
    try {
        await rm(filePath);
    } catch (err) {
        console.log(operationFailed)
    }
}