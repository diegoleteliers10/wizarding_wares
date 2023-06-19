const {Router} = require("express");
const userRouter = Router();
const { createUserRegister } = require("../controllers/userControllers");

// Ruta Para Pedir Todos Los Usuarios
// userRouter.get("/user", (req, res) => {});

// Ruta Para Crear Un Usuario
userRouter.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await createUserRegister(name, email, password);
    return res.status(201).json(result);
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