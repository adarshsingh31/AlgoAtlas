import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

// Connect Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`AlgoAtlas server running on port ${PORT}`);
});
