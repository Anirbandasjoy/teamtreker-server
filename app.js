const express = require("express");
const employeRouter = require("./routes/employ.router");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/em", employeRouter);

app.get("/", (req, res) => {
  res.send({ messsage: "server is running " });
});

module.exports = app;
