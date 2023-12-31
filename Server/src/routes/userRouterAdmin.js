const { Router } = require("express");
const userRouterAdmin = Router();
const {updateRoleUser, userLogicalDeletionAdmin, sendEmailUsers} = require("../controllers/userControllersAdmin");
// para protger las rutas:
const jwt = require('express-jwt');
const {SECRET} = process.env;


// Ruta para cambiar el role de un usuario
userRouterAdmin.put("/user_role/:userId", jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), async (req, res) => { 
  const { roleId } = req.body;
  const {userId} = req.params;
  try {
    const result = await updateRoleUser(roleId, userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});


// Ruta para realizar el borrado logico de un usuario
userRouterAdmin.put("/user_deleteA/:userId", jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), async (req, res) => { 
   const {userId} = req.params;
   try {
    const result = await userLogicalDeletionAdmin(userId);
    return res.status(200).json(result);
   } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
   }
});


// Ruta para realizar envio de Email(s) a usuario(s)
userRouterAdmin.post("/send_emails", async (req, res) => {
  const { userId } = req.query;
  const { asunto, titulo, mensaje } = req.body;
  try {
    const result = await sendEmailUsers(userId, asunto, titulo, mensaje);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(404).json({
      "Error": error.message
    });
  }
});




module.exports = userRouterAdmin;