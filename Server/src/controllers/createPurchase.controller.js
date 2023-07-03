const Purchase= require('../models/Purchase.model')
const Product = require('../models/Product.model')
const Status= require('../models/Status.model')

const createPurchase = async(req,res)=> {
  const {purchaseItems, userId, addressId}=req.body
  try {

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
      purchase.addProduct(purchaseProduct)
    })

    res.status(201).json({message:"Purchase created",purchase:purchase})
  
  } catch (error) {
     res.status(500).json({message:error.message})
  }

}

module.exports= createPurchase
