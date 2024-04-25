const express = require("express");
const employeRouter = require("./routes/employ.router");
const app = express();
const cors = require("cors");
const taskRouter = require("./routes/task.router");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/em", employeRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send({ messsage: "server is running " });
});

module.exports = app;
