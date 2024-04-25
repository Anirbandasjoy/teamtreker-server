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

const findAlltask = (req, res) => {
  try {
    // Create SQL query
    const sql = `SELECT * FROM tasks`;
    // Execute query
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      console.log("Tasks fetched successfully:", results);
      res.status(200).json(results);
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const findSingleTask = (req, res) => {
  try {
    const id = req.params.id;

    const sql = `SELECT * FROM tasks WHERE id = ?`;

    pool.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if task was found
      if (results.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      console.log("Task fetched successfully:", results[0]);
      res.status(200).json(results[0]);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const findTasksByEmployeeId = (req, res) => {
  try {
    const id = req.params.id;
    console.log({ id });
    const sql = `SELECT * FROM tasks WHERE assigned_employee_id = ?`;

    pool.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if tasks were found
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "No tasks found for this employee" });
      }

      console.log("Tasks fetched successfully for employee ID:", id);
      res.status(200).json(results);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createNewTask,
  findAlltask,
  findSingleTask,
  findTasksByEmployeeId,
};
