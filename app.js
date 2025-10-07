import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./src/routes/api.js";

// ------------------- Load environment variables -------------------
dotenv.config({ quiet: true });

// ------------------- Connect to MongoDB -------------------
await connectDB();

const app = express();

// ------------------- Security Middlewares -------------------
app.use(helmet()); // Set secure HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body
app.use(cookieParser()); // Parse cookies
app.use(hpp()); // Prevent HTTP Parameter Pollution

// ------------------- Request sanitizer (replaces xss-clean & mongo-sanitize) -------------------
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (!obj) return;
    for (let key in obj) {
      if (typeof obj[key] === "object") sanitize(obj[key]);
      else if (typeof obj[key] === "string") {
        // Remove $ and . to prevent MongoDB operator injection
        obj[key] = obj[key].replace(/\$/g, "").replace(/\./g, "");
      }
    }
  };
  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
});

// ------------------- Rate Limiter -------------------
const limiter = rateLimit({
  windowMs: 50 * 60 * 1000, // 50 minutes
  max: 100, // limit each IP
});
app.use(limiter);

// ------------------- Routes -------------------
app.use("/api/v1", router);

export default app;


