const { Router } = require("express");
const userRouterAdmin = Router();
const {userLogicalDeletionAdmin} = require("../controllers/userControllersAdmin");

// Ruta para realizar el borrado logico de un usuario
userRouterAdmin.put("/user_deleteA/:userId", async (req, res) => {
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




module.exports = userRouterAdmin;