import {  writeFile } from 'node:fs/promises'
import { operationFailed } from '../../consts/errorMessages.js'
import { join } from 'node:path';
import { getCurrentDirectory } from '../../utils/getCurrentDirectory.js';

export const createFile = async (fileName) => {

    const path = join(getCurrentDirectory(), fileName)
    try {
        await writeFile(path, '', { flag: "wx"})

    } catch (err) {
        console.log(operationFailed)
    }
    }