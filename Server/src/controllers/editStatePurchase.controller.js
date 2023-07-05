const Purchase = require('../models/Purchase.model');
const User = require("../models/Users.model");
const Address = require("../models/Address.model");
const {enviarNotificacion} = require("../utils/notificaciones");
const {diasSemana} = require("../utils/fechas");
const {EMAIL_CREDENTIALS} = process.env;

const estados = ["En preparación", "En camino", "Entregado", "Cancelado"]


const editStatePurchase= async (req, res)=>{
  const {purchaseId}=req.params
  const {statusId}=req.query
  try {
    //encontramos la compra que queremos editar
    const purchase= await Purchase.findByPk(purchaseId)
    console.log("Que es purchase:", purchase);
    //editamos el estado de la compra
    purchase.update({statusStatusId:statusId})

    // *** SECCION PARA ENVIAR LAS NOTIFICACIONES ***

    // Buscamos al usuario
    const user = await User.findAll({where:{userId: purchase.userUserId}});
    const direccion = await Address.findAll({where:{addressId: purchase.addressAddressId}});

    const fecha = new Date;
    const name = user[0].name;
    const email = user[0].email;
    const mensaje = {
      purchaseId: purchase.purchaseId,
      userId: user[0].userId,
      status: estados[statusId - 1],
      date: `${diasSemana[fecha.getDay()]}, ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`,
      address: direccion[0],
      mailWW: EMAIL_CREDENTIALS,
    };


    // Envio de notificaciones
    if(mensaje.status == "En camino"){
      enviarNotificacion(18, name, email, mensaje);
    }




    res.status(200).json({message:"The status of the purchase has been updated succesfully", newStatus:statusId})
  } catch (error) {
    res.status(500).json({message:"There was an error updating the purchase status", error})
  }
}

module.exports= editStatePurchase