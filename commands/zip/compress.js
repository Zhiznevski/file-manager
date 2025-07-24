import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress} from "node:zlib";
import { operationFailed } from "../../consts/errorMessages.js";

export const compressFile = async (filePath, destPath) => {
  const brotliCompress = createBrotliCompress();
  try {
    await pipeline(
      createReadStream(filePath),
      brotliCompress,
      createWriteStream(destPath)
    );
  } catch (err) {
    console.log(operationFailed)
  }
};