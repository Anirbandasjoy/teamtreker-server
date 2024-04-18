const createNewEmploye = async (req, res) => {
  try {
    res.status(201).send({ message: "Create a new employe" });
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
