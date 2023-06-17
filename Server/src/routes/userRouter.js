const {Router} = require("express");
const userRouter = Router();
const { createUserRegister } = require("../controllers/UserControllers");

// Ruta Para Pedir Todos Los Usuarios
// userRouter.get("/user", (req, res) => {});

// Ruta Para Crear Un Usuario
userRouter.post("/user", async (req, res) => {
  const { } = req.body;
  try {
    const result = await createUserRegister();
    return res.status(201).json({
      "Perfect": result
    });
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});

// Ruta Para Editar Un Usuario
// userRouter.put("/user", (req, res) => {});

// Ruta Para Elimar Un Usuario
// userRouter.delete("/user", (req, res) => {});

module.exports = userRouter;