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
import { osCommands } from "./consts/osCommands.js";
import { printEOL } from "./commands/os/printEOL.js";
import { printCPUsInfo } from "./commands/os/printCPUsInfo.js";
import { printHomeDirectory } from "./commands/os/printHomeDirectory.js";
import { printSystemUserName } from "./commands/os/printSystemUserName.js";
import { printArchitecture } from "./commands/os/printArchitecture.js";
import { hashCommands } from "./consts/hashCommands.js";
import { calculateHash } from "./commands/hash/calculateHash.js";
import { zipCommands } from "./consts/zipCommands.js";
import { compressFile } from "./commands/zip/compress.js";
import { decompressFile } from "./commands/zip/decompress.js";

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
            case "os":
                switch (args[0]) {
                    case osCommands.getEOL:
                        printEOL()
                        break;
                    case osCommands.getCpus:
                        printCPUsInfo()
                        break;
                    case osCommands.getHomeDirectory:
                        printHomeDirectory()
                        break;
                    case osCommands.getSystemUserName:
                        printSystemUserName()
                        break;
                    case osCommands.getArchitecture:
                        printArchitecture()
                        break;
                }
            case hashCommands.calculateHash:
                calculateHash(args[0])
                break;
            case zipCommands.compressFile:
                compressFile(args[0], args[1])
                break;
            case zipCommands.decompressFile:
                decompressFile(args[0], args[1])
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