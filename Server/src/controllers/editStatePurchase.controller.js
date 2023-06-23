const Purchase = require('../models/Purchase.model');



const editStatePurchase= async (req, res)=>{
  const {purchaseId}=req.params
  const {statusId}=req.query
  try {
    //encontramos la compra que queremos editar
    const purchase= await Purchase.findByPk(purchaseId)
    //editamos el estado de la compra
    purchase.update({statusStatusId:statusId})
    res.status(200).json({message:"The status of the purchase has been updated succesfully", newStatus:statusId})
  } catch (error) {
    res.status(500).json({message:"There was an error updating the purchase status", error})
  }
}

module.exports= editStatePurchase