import { chdir } from 'node:process';
import { operationFailed } from '../../consts/errorMessages.js';


export const cd = (directory) => {
try {
  chdir(directory);
} catch (err) {
  console.log(operationFailed)
}}