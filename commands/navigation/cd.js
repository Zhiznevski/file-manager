import { chdir } from 'node:process';
import { getCurrentDirectoryMessage } from '../../utils/getCurrentDirectoryMessage.js';
import { getCurrentDirectory } from '../../utils/getCurrentDirectory.js';
import { operationFailed } from '../../consts/errorMessages.js';


export const cd = (directory) => {
try {
  chdir(directory);
  console.log(getCurrentDirectoryMessage(getCurrentDirectory()));
} catch (err) {
  console.log(operationFailed)
}}