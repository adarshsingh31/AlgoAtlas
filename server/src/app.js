import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();

// CORS Middleware
const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://algo-atlas-tau.vercel.app"
];

const envOrigins = [];
if (process.env.CLIENT_URL) {
  envOrigins.push(...process.env.CLIENT_URL.split(",").map((o) => o.trim()));
}
if (process.env.FRONTEND_URL) {
  envOrigins.push(...process.env.FRONTEND_URL.split(",").map((o) => o.trim()));
}

const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Returning false instead of throwing an Error prevents a 500 response.
        // It simply omits the CORS headers, letting the browser reject it gracefully.
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("AlgoAtlas Backend Running ✅");
});

// Catch-all 404 handler for undefined routes
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
