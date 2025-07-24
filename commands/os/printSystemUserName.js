import { userInfo } from 'node:os'

export const printSystemUserName = () => {
    console.log(userInfo().username);
}