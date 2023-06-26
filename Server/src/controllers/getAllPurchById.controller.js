const Products=require('../models/Product.model')
const Purchases = require('../models/Purchase.model')

const getAllPurchById= async (req,res)=>{
  
  const {userId}=req.params; //o req.query
  try {
    const purchase= await Purchases.findAll({
      where:{
        userUserId:userId
      },
      include: {
        model: Products,
        attributes: ['name','description','image','price'],
        through: {
          attributes: []
        }
      }
    });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({message:error.message});
  }

}

module.exports=getAllPurchById;