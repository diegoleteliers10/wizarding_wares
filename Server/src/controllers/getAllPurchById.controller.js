const Products=require('../models/Product.model');
const Purchases = require('../models/Purchase.model');
const Status = require('../models/Status.model');
const Users = require('../models/Users.model');


const getAllPurchById= async (req,res)=>{
  const {userId}=req.params; 

  try {
    const purchase= await Purchases.findAll({
      where:{
        userUserId:userId
      },
      include: [{
        model: Products,
        attributes: ['productId','name','description','image','price'],
        through: {
          attributes: []
        }
      },
      {
        model: Status,
        attributes: ['name'], 
      },
      {
        model: Users,
        attributes: ['name'], 
      },
    ]});
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({message:error.message});
  }

}

module.exports=getAllPurchById;