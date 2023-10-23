require("express-async-errors");

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Mongo connection is successful");
  })
  .catch(() => {
    console.timeLog("Mongo connection failed");
  });

//   Models initialization
require("./models/users.model");

app.use(express.json());

// Routes:
app.use("/api/users", userRoutes);

// End of all routes:
app.use(errorHandler);
app.listen(8000, () => {
  console.log("Server started successfully");
});
