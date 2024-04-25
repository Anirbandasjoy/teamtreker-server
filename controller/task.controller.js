const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const createNewTask = async (req, res) => {
  try {
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

      res.status(200).json(results);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateTaskStatus = (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const sql = `UPDATE tasks SET status = ? WHERE id = ?`;
    pool.query(sql, [status, id], (err, results) => {
      if (err) {
        console.error("Error updating task status:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if any task was updated
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      console.log("Task status updated successfully");
      res.status(200).json({ message: "Task status updated successfully" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const sql = `DELETE FROM tasks WHERE id = ?`;
    pool.query(sql, [taskId], (err, results) => {
      if (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if any task was deleted
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      console.log("Task deleted successfully");
      res.status(200).json({ message: "Task deleted successfully" });
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
  updateTaskStatus,
  deleteTask,
};
