import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";
import { typeDefs, resolvers } from "./src/graphql/index.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { config } from "./src/config/index.js";
// import auth from "./src/restapi/routes/auth.js";``
import mime from "mime";

// MongoDB connection
const connectDatabase = async (URI) => {
  try {
    if (!URI) {
      throw new Error("MongoDB URI is undefined.");
    }
    await mongoose.connect(URI);
    console.log(`MongoDB connected successfully: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDatabase(config.mongodb.uri);

// Path resolution for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Setup
const allowedOrigins = config.cors.allowedOrigins;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials like cookies
};

const app = express();

// Middleware Setup
app.use(cors(corsOptions));

app.use(express.json({ limit: config.upload.maxSize }));
app.use(express.urlencoded({ extended: true, limit: config.upload.maxSize }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// Serve static files
// app.use("/src/uploads", express.static(path.join(__dirname, config.upload.path)));

app.use(
  "/src/uploads",
  (req, res, next) => {
    const filePath = path.join(__dirname, req.path);
    const contentType = mime.getType(filePath);
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }
    next();
  },
  express.static(path.join(__dirname, "/src/uploads"))
);

// app.use("/src/uploads", express.static(path.join(__dirname, "/src/uploads")));
app.use(express.static(path.join(__dirname, "public")));

// HTTP Server setup
const httpServer = http.createServer(app);

// app.use("/api/auth", auth);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, io }), // Pass `io` to context for resolvers
  subscriptions: {
    path: "/graphql", // Ensure subscriptions path matches GraphQL endpoint
  },
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, cors: false }); // Disable Apollo's CORS handling

// Start server
httpServer.listen(config.port, () => {
  console.log(
    `Server running in ${config.nodeEnv} mode on port ${config.port}`
  );
  console.log(
    `GraphQL ready at: http://localhost:${config.port}${apolloServer.graphqlPath}`
  );
});

// Graceful shutdown handling
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  shutdownServer();
});

process.on("SIGINT", shutdownServer);
process.on("SIGTERM", shutdownServer);

function shutdownServer() {
  console.log("Shutting down server...");
  httpServer.close(() => {
    console.log("Closed server connections.");
    process.exit(1);
  });
}
