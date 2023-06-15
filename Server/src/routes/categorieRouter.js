const { Router } = require("express");
const categorieRouter = Router();
const { crearCategoria } = require("../controllers/categorieControllers");


// Ruta para crear una categoria
categorieRouter.post("/categorie", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await crearCategoria(name);
    return res.status(201).json({
      "Perfect": result
    });
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


module.exports = categorieRouter;