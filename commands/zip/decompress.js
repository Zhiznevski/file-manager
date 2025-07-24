import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { operationFailed } from "../../consts/errorMessages.js";

export const decompressFile = async (filePath, destPath) => {
  const brotliDecoompress = createBrotliDecompress();
  try {
    await pipeline(
      createReadStream(filePath),
      brotliDecoompress,
      createWriteStream(destPath)
    );
  } catch (err) {
    console.log(operationFailed)
  }
};