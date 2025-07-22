import {  mkdir } from 'node:fs/promises'
import { operationFailed } from '../../consts/errorMessages.js'
import { join } from 'node:path';
import { getCurrentDirectory } from '../../utils/getCurrentDirectory.js';

export const createDirectory = async (folderName) => {
    
    const path = join(getCurrentDirectory(), folderName)

    try {
        await mkdir(path, { recursive: false})
    } catch (err) {
        console.log(operationFailed)
    }
    }