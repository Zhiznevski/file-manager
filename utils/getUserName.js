
const fallbackName = "User"

export const getUserName = () => {
    const args = process.argv.slice(1)
    const userName = args.find(arg => String(arg).startsWith('--username'))?.split("=")[1] || fallbackName
    return userName;
}