import { chdir } from 'node:process';
import { operationFailed } from '../../consts/errorMessages.js';


export const up = () => {
try {
  chdir('..');
} catch (err) {
  console.log(operationFailed)
}}