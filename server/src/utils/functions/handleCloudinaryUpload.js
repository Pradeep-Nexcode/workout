import { v2 as cloudinary } from "cloudinary";

// 🔑 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ddu3qfqfi",
  api_key: process.env.CLOUDINARY_API_KEY || "383831338322782",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "r1KwtOtBi5TGjtU1FNojKXWCuj8",
});

 

/**
 * @param {FileUpload} file - GraphQLUpload file
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<{ url: string, file: string, altText: string }>}
 */
const handleCloudinaryUpload = async (file, folder) => {
  const { createReadStream, filename } = file;

  // Create upload stream to Cloudinary
  const uploadStream = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" }, // auto = image/video detection
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      createReadStream().pipe(stream);
    });

  // Wait for upload to complete
  const result = await uploadStream();

  return {
    url: result.secure_url,
    file: result.public_id, // Cloudinary's unique ID
    altText: filename.replace(/\.[^/.]+$/, ""), // Remove extension
  };
};

export default handleCloudinaryUpload;
