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
    const purchase= await Purchase.findByPk(purchaseId);
    //editamos el estado de la compra
    purchase.update({statusStatusId:statusId})


    // *** SECCION PARA ENVIAR LAS NOTIFICACIONES ***

    // Buscamos al usuario
    const user = await User.findAll({where:{userId: purchase.dataValues.userUserId}});
    const direccion = await Address.findAll({where:{addressId: purchase.dataValues.addressAddressId}});
    console.log("user es:", user);
    console.log("direccion es:", direccion);

    const fecha = new Date();
    const name = user[0].name;
    const email = user[0].email;
    const mensaje = {
      purchaseId: purchase.dataValues.purchaseId,
      userId: user[0].userId,
      status: estados[statusId - 1],
      date: `${diasSemana[fecha.getDay()]}, ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`,
      street: direccion[0].street,
      number: direccion[0].number,
      zipCode: direccion[0].zipCode,
      phoneNumber: direccion[0].phoneNumber,
      mailWW: EMAIL_CREDENTIALS,
    };

    console.log("mensjae es:", mensaje);


    // Envio de notificaciones
    (mensaje.status == "En camino") && enviarNotificacion(18, name, email, mensaje);
    if(mensaje.status == "Entregado"){
      enviarNotificacion(19, name, email, mensaje);
      enviarNotificacion(20, name, email, mensaje);
    }
    if(mensaje.status == "Cancelado"){
      enviarNotificacion(21, name, email, mensaje);
      enviarNotificacion(22, name, email, mensaje);
    }

    res.status(200).json({message:"The status of the purchase has been updated succesfully", newStatus:statusId})
  } catch (error) {
    res.status(500).json({message:"There was an error updating the purchase status", error})
  }
}

module.exports= editStatePurchase