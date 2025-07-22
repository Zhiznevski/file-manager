import { getUserName } from "./utils/getUserName.js";
import { getGreetingMessage } from "./utils/getGreetingMessage.js";
import { createInterface } from "node:readline/promises"
import { up } from "./commands/navigation/up.js";
import { invalidInput } from "./consts/errorMessages.js";
import { cd } from "./commands/navigation/cd.js";
import { ls } from "./commands/navigation/ls.js";
import { getHomeDirectory } from "./utils/getHomeDirectory.js";
import { getGoodByeMessage } from "./utils/getGoodByeMessage.js";
import { readFile } from "./commands/fs/readFile.js";
import { createFile } from "./commands/fs/createFile.js";
import { createDirectory } from "./commands/fs/createDirectory.js";

const startApp = async () =>  {

    const userName = getUserName()

    const rl = createInterface({input: process.stdin, output: process.stdout})

    rl.write(getGreetingMessage(userName))

    cd(getHomeDirectory())

    rl.on("line", (data) => {

        if (data == ".exit") { //TODO: Need to create object with all commands to remove these strings
            rl.close()
            return;
        
        }
        if (data === "up") {
            up();
            
        }
        if (data.startsWith("cd ")) {
            const directory = data.split(" ")?.[1]
            cd(directory)
        }

        if (data === 'ls') {
           ls();
        }

        if (data.startsWith("cat ")) {
             const filePath = data.split(" ")?.[1]
             readFile(filePath)
             
        }

        if (data.startsWith("add ")) {
             const fileName = data.split(" ")?.[1]
             createFile(fileName)
             
        }   

        if (data.startsWith("mkdir ")) {
            const directoryName = data.split(" ")?.[1]
            createDirectory(directoryName)
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