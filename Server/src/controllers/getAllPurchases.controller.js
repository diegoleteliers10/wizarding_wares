const Products=require('../models/Product.model')
const Purchases = require('../models/Purchase.model')

const getAllPurchase= async (req,res)=>{

  try {
    const purchases= await Purchases.findAll({
      include: {
        model: Products,
        attributes: ['name','description','image','price'],
        through: {
          attributes: []
        }
      }
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({message:error.message});
  }

}

module.exports=getAllPurchase;