import { cpus } from 'node:os'

export const printCPUsInfo = () => {
    console.log(`amount of CPUS: ${cpus().length}`);
    console.table(cpus().map(c => ({
        model: c.model,
        "clock rate": c.speed / 1000
    })))
}