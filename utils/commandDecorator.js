import { getCurrentDirectory } from "./getCurrentDirectory.js";
import { getCurrentDirectoryMessage } from "./getCurrentDirectoryMessage.js";

export const commandDecorator = async (command, ...args) => {
    await command(...args)
    console.log('\n' + getCurrentDirectoryMessage(getCurrentDirectory()));
}