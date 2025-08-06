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
const handleImageUpload = async (file, uploadDir, baseUrl, folder) => {
  const { createReadStream, filename, mimetype } = file;

  const uniqueName = `${uuidv4()}-${filename}`;
  const targetPath = path.join(uploadDir, uniqueName);

  // Ensure uploadDir exists
  fs.mkdirSync(uploadDir, { recursive: true });

  console.log(uploadDir, '')

  const stream = createReadStream();
  const out = fs.createWriteStream(targetPath);
  stream.pipe(out);
  await finished(out);

  return {
    url: `${baseUrl}/src/uploads/${folder}/${uniqueName}`,
    file: uniqueName,
    altText: filename.replace(/\.[^/.]+$/, ""), // Remove extension for alt
  };
};

export default handleImageUpload;


// export const deleteCloudinaryImage = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//   }
// };
