import fs from "fs";
import path from "path";
import { finished } from "stream/promises";
import { v4 as uuidv4 } from "uuid";

/**
 * @param {FileUpload} file - GraphQLUpload file
 * @param {string} uploadDir - Absolute path to save the file
 * @param {string} baseUrl - BASE_URL like https://yourdomain.com
 * @returns {Promise<{ url: string, file: string, altText: string }>}
 */
const handleImageUpload = async (file, uploadDir, baseUrl) => {
  const { createReadStream, filename, mimetype } = file;

  const uniqueName = `${uuidv4()}-${filename}`;
  const targetPath = path.join(uploadDir, uniqueName);

  // Ensure uploadDir exists
  fs.mkdirSync(uploadDir, { recursive: true });

  const stream = createReadStream();
  const out = fs.createWriteStream(targetPath);
  stream.pipe(out);
  await finished(out);

  return {
    url: `${baseUrl}/uploads/categories/${uniqueName}`,
    file: uniqueName,
    altText: filename.replace(/\.[^/.]+$/, ""), // Remove extension for alt
  };
};

export default handleImageUpload;
