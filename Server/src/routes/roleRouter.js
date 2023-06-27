const { Router } = require("express");
const roleRouter = Router();
const { getAllRoles, createNewRole } = require("../controllers/roleControllers");


// Ruta para pedir todos los roles
roleRouter.get("/role", async (req, res) => {
  try {
    const result = await getAllRoles();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


// Ruta para crear un Role
roleRouter.post("/role", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await createNewRole(name);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


module.exports = roleRouter;