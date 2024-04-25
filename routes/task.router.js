const {
  createNewTask,
  findAlltask,
  findSingleTask,
  findTasksByEmployeeId,
} = require("../controller/task.controller");

const taskRouter = require("express").Router();

taskRouter.post("/create", createNewTask);
taskRouter.get("/find", findAlltask);
taskRouter.get("/find-single-task/:id", findSingleTask);
taskRouter.get("/findBy-employeeId/:id", findTasksByEmployeeId);

module.exports = taskRouter;
