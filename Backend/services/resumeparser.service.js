import fs from "fs";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // ✅ NOW WORKS

export const parseResume = async (file) => {
  if (!file) {
    throw new Error("No file received");
  }

  if (file.mimetype === "application/pdf") {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer); // ✅ function
    return data.text;
  }

  if (file.mimetype.includes("wordprocessingml")) {
    const result = await mammoth.extractRawText({ path: file.path });
    return result.value;
  }

  throw new Error("Unsupported resume format");
};
