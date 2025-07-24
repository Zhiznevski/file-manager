
export const handleUserInput = (input) => {

    if (typeof input !== "string") return;

    const [ command,  ...args ] = input.split(" ")
    return { command, args }

}