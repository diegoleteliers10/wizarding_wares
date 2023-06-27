const { Router } = require("express");
const categoryRouter = Router();
const { crearCategoria, getAllCategories, updateACategory, deleteACategory } = require("../controllers/categoryControllers");

// Ruta Para Pedir Todas Las Categorias
categoryRouter.get("/category", async (req, res) => {
  try {
    const result = await getAllCategories();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


// Ruta para crear una categoria
categoryRouter.post("/category", async (req, res) => {
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


// Ruta para modificar una categoria
categoryRouter.put("/category", async (req, res) => {
  const { name, modify } = req.body;
  try {
    const result = await updateACategory(name, modify);
    return res.status(200).json({
      "Perfect": result
    });
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


// Ruta para eliminar una categoria
categoryRouter.delete("/category", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await deleteACategory(name);
    return res.status(200).json({
      "Perfect": result
    });
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


module.exports = categoryRouter;