const { createNewEmploye } = require("../controller/employe.controller")

const employeRouter =  require("express").Router()


employeRouter.post("/create", createNewEmploye)

module.exports = employeRouter