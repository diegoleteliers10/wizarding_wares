const Review = require('../models/Review.model');
const Purchase = require('../models/Purchase.model')
const Products = require('../models/Product.model')

const createReview = async(req,res)=>{
  const {userId,productId,comment,rating}=req.body
  try {
    //verificamos que el usuario tenga una compra
    const purchaseUser = await Purchase.findAll({
      where: {
        userUserId: userId,
      },
      include: {
        model: Products, 
        attributes: ['productId', 'name'],
        through: {
          attributes: []
        }
      }
    });

    if(purchaseUser){
      //verificamos que los id sean de tipo uuid
      if(typeof userId !== 'string' || typeof productId !== 'string'){
        res.status(400).send('Los id deben ser de tipo uuid y no numericos')
      };
      //verificamos que los datos sean correctos 
      if(!userId||!productId||!comment||!rating){
        res.status(400).send('Datos incorrectos')
      };

      //verificamos que el producto este dentro de la compra

      const productInPurchase= purchaseUser.forEach(purchase =>{
        purchase.products.find(pro=>pro.productId===productId)
      })
      console.log(productInPurchase)

      //Si los datos son correctos creamos la review
      // const review = await Review.create({
      //   userUserId:userId,
      //   productProductId:productId,
      //   comment:comment,
      //   rating:rating
      // })

      // res.status(200).json({message:"Review, fue creada con exito",review:review})
      res.status(200).json({message:"Review, fue creada con exito",purchaseUser:purchaseUser})

    }
  } catch (error) {
    res.status(500).send(error)
  }

}

module.exports = createReview;