import { readdir } from "node:fs/promises"
import { getCurrentDirectoryMessage } from '../../utils/getCurrentDirectoryMessage.js';
import { getCurrentDirectory } from '../../utils/getCurrentDirectory.js';
import { operationFailed } from '../../consts/errorMessages.js';
import { type } from "node:os";

const listItemTypes = {
    directory: "directory",
    file: "file"
}

export const ls = async () => {
try {
  const res = await readdir(getCurrentDirectory(), { withFileTypes: true })
  console.table(res.map(f => ({
    name: f.name,
    type: f.isDirectory() ? listItemTypes.directory : listItemTypes.file,
  })).sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    const typeA = a.type;
    const typeB = b.type;
     if (typeA === listItemTypes.directory && typeB === listItemTypes.file) {
        return -1;
    }
    if (typeA === listItemTypes.file && typeB === listItemTypes.directory) {
        return 1;
    }
    if (nameA > nameB) {
        return 1;
    } 
    if (nameA < nameB) {
        return -1;
    }
   }))
  console.log(getCurrentDirectoryMessage(getCurrentDirectory()));
} catch (err) {
  console.log(operationFailed)
}}