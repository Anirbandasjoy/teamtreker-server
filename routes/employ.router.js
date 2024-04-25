const {
  createNewEmploye,
  getAllEmployee,
  getEmployeeByEmail,
} = require("../controller/employe.controller");

const employeRouter = require("express").Router();

employeRouter.post("/create", createNewEmploye);
employeRouter.get("/getAll-employee", getAllEmployee);
employeRouter.get("/single-employee/:email", getEmployeeByEmail);

module.exports = employeRouter;
