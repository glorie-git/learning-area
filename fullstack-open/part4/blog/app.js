const blogRouter = require("./controllers/blogs");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

mongoose
  .connect(config.URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
