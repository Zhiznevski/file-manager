import { homedir } from 'node:os';

export const getHomeDirectory = () => {
    return homedir()
}