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
import { invalidInput } from "./consts/errorMessages.js";
import { generalCommands } from "./consts/generalCommands.js";
import { exit, stdin, stdout } from "node:process";
import { commandDecorator } from "./utils/commandDecorator.js";

const startApp = async () =>  {

    const userName = getUserName()

    const rl = createInterface({input: stdin, output: stdout})

    rl.write(getGreetingMessage(userName))

    cd(getHomeDirectory())

    rl.on("line", (data) => {
        
        const { command, args } = handleUserInput(data)

        switch ( command ) {
            case navigationCommands.upperDirectory: 
                commandDecorator(up)
                break;
            case navigationCommands.changeDirectory:
                commandDecorator(cd, args[0])
                break;
            case navigationCommands.fileList:
                commandDecorator(ls)
                break;
            case fsCommands.readFile:
                commandDecorator(readFile, args[0])
                break;
            case fsCommands.createFile:
                commandDecorator(createFile, args[0])
                break;
            case fsCommands.createDirectory:
                commandDecorator(createDirectory, args[0])
                break;
            case fsCommands.renameFile:
                commandDecorator(renameFile, args[0], args[1])
                break;
            case fsCommands.copyFile:
                commandDecorator(copyFile, args[0], args[1])
                break;
            case fsCommands.moveFile:
                commandDecorator(moveFile, args[0], args[1])
                break;
            case fsCommands.deleteFile:
                commandDecorator(deleteFile, args[0])
                break;
            case "os":
                switch (args[0]) {
                    case osCommands.getEOL:
                        commandDecorator(printEOL)
                        break;
                    case osCommands.getCpus:
                        commandDecorator(printCPUsInfo)
                        break;
                    case osCommands.getHomeDirectory:
                        commandDecorator(printHomeDirectory)
                        break;
                    case osCommands.getSystemUserName:
                        commandDecorator(printSystemUserName)
                        break;
                    case osCommands.getArchitecture:
                        commandDecorator(printArchitecture)
                        break;
                    default:
                        process.stdout.write(invalidInput + '\n')
                }
                break;     
            case hashCommands.calculateHash:
                commandDecorator(calculateHash, args[0])
                break;
            case zipCommands.compressFile:
                commandDecorator(compressFile, args[0], args[1])
                break;
            case zipCommands.decompressFile:
                commandDecorator(decompressFile, args[0], args[1])
                break;    

            case generalCommands.exit:
                rl.close()
                return;
            
            default:
                process.stdout.write(invalidInput + '\n')
                break;
        }
    }).on('close', () => {
    console.log(getGoodByeMessage(userName))
    exit(0);
});
}

startApp()