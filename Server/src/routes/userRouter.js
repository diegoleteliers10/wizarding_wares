const {Router} = require("express");
const userRouter = Router();
const { createUserRegister, updateUser, logicalUserDeletion, verificarCuenta } = require("../controllers/UserControllers");
const jwt = require('express-jwt');
const {SECRET} = process.env;

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
userRouter.put("/user/:userId", jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), async (req, res) => {
  const {name, email, password} = req.body;
  const { userId } = req.params;
  try {
    const result = await updateUser(name, email, password, userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});

// Ruta Para Elimar Un Usuario ( Borrado Logico )
userRouter.put("/user_delete/:userId", jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await logicalUserDeletion(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": res.message
    });
  }
});


// Ruta para verificar cuenta de usuario ( Para ver si no es un Robot ) Correo tipico de revisa tu email y verifica tu cuenta
userRouter.get("/verificar-cuenta", async (req, res) => {
  const token = req.query.token;
  try {
    const result = await verificarCuenta(token);
    return res.status(200).send(result);
  } catch (error) {
    console.error(`Èrror al verificar cuenta: ${error}`);
    res.status(500).json({
      "Error": error.message
    });
  }
});

module.exports = userRouter;