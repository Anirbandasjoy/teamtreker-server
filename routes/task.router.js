const {
  createNewTask,
  findAlltask,
  findSingleTask,
  findTasksByEmployeeId,
  updateTaskStatus,
} = require("../controller/task.controller");

const taskRouter = require("express").Router();

taskRouter.post("/create", createNewTask);
taskRouter.get("/find", findAlltask);
taskRouter.get("/find-single-task/:id", findSingleTask);
taskRouter.get("/findBy-employeeId/:id", findTasksByEmployeeId);
taskRouter.put("/update-status/:id", updateTaskStatus);

module.exports = taskRouter;
