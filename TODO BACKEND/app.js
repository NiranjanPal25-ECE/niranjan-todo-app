require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoItemsRouter = require("./routes/todoItemsRouter");
const authRouter = require("./routes/authRouter");
const errorController = require("./controllers/error");

const app = express();

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running",
  });
});

app.use("/auth", authRouter);

app.use("/api/todo", todoItemsRouter);

app.use(errorController.pageNotFound);

const DB_PATH = process.env.MONGO_URI;

const port = process.env.PORT || 5002;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(
        `Server running at http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log(
      "Error while connecting to MongoDB:",
      err
    );
  });