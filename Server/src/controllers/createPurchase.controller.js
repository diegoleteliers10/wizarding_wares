const Purchase= require('../models/Purchase.model')
const Product = require('../models/Product.model')
const Status= require('../models/Status.model')
const User = require("../models/Users.model");
const Address = require("../models/Address.model");
const {diasSemana} = require("../utils/fechas");
const {enviarNotificacion} = require("../utils/notificaciones");
const {EMAIL_CREDENTIALS} = process.env;

const createPurchase = async(req,res)=> {
  const {purchaseItems, userId, addressId}=req.body
  try {

    // Buscamos el usuario
    const user = await User.findAll({where:{userId: userId}});
    const direccion = await Address.findAll({where: {addressId: addressId}});

    const defaultStatus=await Status.findAll()
    ;

    const purchase= await Purchase.create({
      statusStatusId:defaultStatus[0].statusId,
      userUserId:userId,
      addressAddressId: addressId
    })

    
    purchaseItems.forEach(async(e)=>{
      const purchaseProduct= await Product.findByPk(e.productId)
      purchaseProduct.update({stock:purchaseProduct.stock-e.quantity})
      purchase.addProduct(purchaseProduct);
    })


    // *** SECCION PARA EL ENVIO DE LAS NOTIFICACIONES ***
    const estados = ["En preparación", "En camino", "Entregado", "Cancelado"]

    let cantProductos = 0;
    let precioU = 0;
    let totalCompra = 0;
    purchaseItems.forEach((elem) => {
     cantProductos += elem.quantity;
     precioU += elem.price; 
     totalCompra += (elem.quantity * elem.price);
    });

    const fecha = new Date();
    let name = user[0].name;
    let email = user[0].email;
    // Definimos las opciones de mensaje
    let mensaje = {
      productos : purchaseItems,
      purchaseId: purchase.dataValues.purchaseId,
      userUserId: purchase.dataValues.userUserId,
      addressAddressId: purchase.dataValues.addressAddressId,
      street: direccion[0].street,
      number: direccion[0].number,
      zipCode: direccion[0].zipCode,
      phoneNumber: direccion[0].phoneNumber,
      date: `${diasSemana[fecha.getDate()]}, ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`,
      status: estados[purchase.dataValues.statusStatusId - 1],
      cantProductos: cantProductos,
      precioU: precioU,
      totalCompra: totalCompra,
      mailWW: EMAIL_CREDENTIALS,
    };

    // Enviamos una notificacion al administrador de la venta realizada
    enviarNotificacion(16, name, email, mensaje); 
    // Enviamos una notificacion al usuario de la compra realizada
    enviarNotificacion(17, name, email, mensaje);

    // Respuesta del servidor
    res.status(201).json({message:"Purchase created",purchase:purchase})
  
  } catch (error) {
     res.status(500).json({message:error.message})
  }

}

module.exports= createPurchase
