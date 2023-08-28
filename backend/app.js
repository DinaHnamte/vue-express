const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
// Route imports
const user_route = require("./routes/user");
// Middleware
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
// Routes
app.use("/user", user_route);
// Exports
module.exports = app;
