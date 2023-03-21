require("dotenv").config();
const express = require("express");
const connectDb = require("./database/db");
const userRoutes = require("./routes/userRoutes");

// invoking expess
const app = express();

// middleware
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("WELCOME TO QVF FARMS.");
});

app.use("/api/v1/users", userRoutes);

// export app
module.exports = app;
