const Purchase= require('../models/Purchase.model')
const Product = require('../models/Product.model')

const createPurchase = async(req,res)=> {
  const {purchaseItems, userId, addressId,statusId}=req.body
  try {
    const purchase= await Purchase.create({
      statusStatusId:statusId,
      userUserId:userId,
      addressAddressId: addressId
    })

    purchaseItems.forEach(async(e)=>{
    const purchaseProduct= await Product.findByPk(e.productId)
    purchase.addProduct(purchaseProduct)
    })

    res.status(201).json({message:"Purchase created",purchase:purchase})
  
  } catch (error) {
     res.status(500).json({message:error.message})
  }

}

module.exports= createPurchase
