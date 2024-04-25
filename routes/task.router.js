const { createNewTask } = require("../controller/task.controller");

const taskRouter = require("express").Router();

taskRouter.post("/create", createNewTask);

module.exports = taskRouter;
