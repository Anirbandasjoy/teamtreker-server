const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const createNewTask = async (req, res) => {
  try {
    console.log(req.body);
    const id = uuidv4();
    const {
      title,
      description,
      deadline,
      priority,
      assigned_employee_id,
      status,
    } = req.body;

    // Create SQL query
    const sql = `INSERT INTO tasks (id, title, description, deadline, priority, assigned_employee_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      id,
      title,
      description,
      deadline,
      priority,
      assigned_employee_id,
      status,
    ];

    // Execute query
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      console.log("Task created successfully:", result);
      res
        .status(201)
        .json({ message: "Task created successfully", task: req.body });
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createNewTask,
};
