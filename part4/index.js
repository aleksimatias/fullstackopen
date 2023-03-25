const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const blogRouter = require("./controllers/blogs");
const mongoUrl = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
