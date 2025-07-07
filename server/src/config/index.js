import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.join(__dirname, "../../", envFile) });

export const config = {
  // Server Configuration
  port: process.env.PORT || 3004,
  nodeEnv: process.env.NODE_ENV || "development",

  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/workout",
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || "your-default-jwt-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  // CORS Configuration
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["http://localhost:5173", "https://studio.apollographql.com"],
  },

  // File Upload Configuration
  upload: {
    maxSize: process.env.UPLOAD_MAX_SIZE || "50mb",
    path: process.env.UPLOAD_PATH || "../../uploads",
  },

  // OAuth Configuration
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};
