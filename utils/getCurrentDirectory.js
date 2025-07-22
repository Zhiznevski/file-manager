import { cwd } from 'node:process';


export const getCurrentDirectory = () => {
    return cwd();
}