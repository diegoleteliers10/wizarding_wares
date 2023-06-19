const { Router } = require("express");
const roleRouter = Router();
const { createNewRole } = require("../controllers/roleControllers");


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