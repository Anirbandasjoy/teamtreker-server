const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const createNewEmploye = async (req, res) => {
  try {
    const id = uuidv4();
    const { name, email, phone, password, address, role, designation } =
      req.body;
    await pool.query(
      "INSERT INTO employee (id,name,email, password, phone, address, role, designation) VALUES (?,?,?,?,?,?,?,?)",
      [id, name, email, password, phone, address, role, designation],
      (err, results, fields) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Internal server error", error: err.message });
        }
        res.status(200).send({
          message: "Create a new Employee",
          payload: {
            id,
            name,
            email,
            password,
            phone,
            address,
            role,
            designation,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Inernal Server Error", error: error.message });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    // Query to fetch all employee
    pool.query("SELECT * FROM employee", (error, results, fields) => {
      if (error) {
        console.error("Error retrieving tasks:", error);
        return res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getEmployeeByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    // Query to fetch a single employee by email
    pool.query(
      "SELECT * FROM employee WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          console.error("Error retrieving employee:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }

        // Check if employee with given email exist
        if (results.length === 0) {
          return res.status(404).json({ message: "Employee not found" });
        }

        // Return the employee data
        res.status(200).json(results[0]);
      }
    );
  } catch (error) {
    console.error("Error retrieving employee:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createNewEmploye,
  getAllEmployee,
  getEmployeeByEmail,
};
