//connect to mongodb
require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();

// const errorHandler = require("./controllers/errorController");
// const errorController = require("./controllers/errorController");

const courseRouter = require("./routes/courseRoute");
const userRouter = require("./routes/userRoute");
const subscriberRouter = require("./routes/subscriberRoute");
const errorHandler = require("./controllers/errorController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;

app.use(errorHandler);

app.use("/courses", courseRouter);
app.use("subscriber", subscriberRouter);
app.use("/users", userRouter);
