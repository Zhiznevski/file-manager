import { getUserName } from "./utils/getUserName.js";
import { getGreetingMessage } from "./utils/getGreetingMessage.js";
import { createInterface } from "node:readline/promises"
import { up } from "./commands/navigation/up.js";
import { cd } from "./commands/navigation/cd.js";
import { ls } from "./commands/navigation/ls.js";
import { getHomeDirectory } from "./utils/getHomeDirectory.js";
import { getGoodByeMessage } from "./utils/getGoodByeMessage.js";
import { readFile } from "./commands/fs/readFile.js";
import { createFile } from "./commands/fs/createFile.js";
import { createDirectory } from "./commands/fs/createDirectory.js";
import { handleUserInput } from "./utils/handleUserInput.js";
import { navigationCommands } from "./consts/navigationCommands.js";
import { fsCommands } from "./consts/fsCommands.js";
import { renameFile } from "./commands/fs/renameFile.js";
import { copyFile } from "./commands/fs/copyFile.js";
import { moveFile } from "./commands/fs/moveFile.js";
import { deleteFile } from "./commands/fs/deleteFile.js";

const startApp = async () =>  {

    const userName = getUserName()

    const rl = createInterface({input: process.stdin, output: process.stdout})

    rl.write(getGreetingMessage(userName))

    cd(getHomeDirectory())

    rl.on("line", (data) => {
        
        const { command, args } = handleUserInput(data)

        switch ( command ) {
            case navigationCommands.up: 
                up();
                break;
            case navigationCommands.changeDirectory:
                cd(command);
                break;
            case navigationCommands.fileList:
                ls();
                break;
            case fsCommands.readFile:
                readFile(args[0]);
                break;
            case fsCommands.createFile:
                createFile(args[0])
                break;
            case fsCommands.createDirectory:
                createDirectory(args[0])
                break;
            case fsCommands.renameFile:
                renameFile(args[0], args[1])
                break;
            case fsCommands.copyFile:
                copyFile(args[0], args[1])
                break;
            case fsCommands.moveFile:
                moveFile(args[0], args[1])
                break;
            case fsCommands.deleteFile:
                deleteFile(args[0])
                break;
        }
        
        if (command == ".exit") { //TODO: Need to create object with all commands to remove these strings
            rl.close()
            return;
        }

        // else {
        //     console.log(invalidInput) //TODO:  need to handle this 
        // }
    })

    rl.on("close", () => {
        console.log(getGoodByeMessage(userName))
    })

}

startApp()