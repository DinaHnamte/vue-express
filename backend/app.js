const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { initializeDatabase } = require("./lib/database");

// Middleware
const app = express();
dotenv.config();
app.use(helmet());
app.use(cookie_parser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

initializeDatabase();
// Route imports
const user_route = require("./routes/user");
const admin_route = require("./routes/admin");
// Routes
app.use("/user", user_route);
app.use("/admin", admin_route);
// Exports
module.exports = app;
