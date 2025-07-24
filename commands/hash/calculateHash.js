const { createHash } = await import("node:crypto");
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { operationFailed } from "../../consts/errorMessages.js";

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");
  const input = createReadStream(filePath);
  try {
    await pipeline(input, hash);
    console.log(`${hash.digest("hex")}`);
  } catch (err) {
    console.log(operationFailed)
  }
};