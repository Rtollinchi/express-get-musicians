const express = require("express");
const app = express();
const musiciansRouter = require("../routes/musicians");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/musicians", musiciansRouter);

module.exports = app;
