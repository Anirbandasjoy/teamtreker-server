const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");
const createNewEmploye = async (req, res) => {
  try {
    const id = uuidv4();
    const { name, email, password, phone, address, role, designation } =
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

module.exports = {
  createNewEmploye,
};
