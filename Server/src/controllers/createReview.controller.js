const Review = require('../models/Review.model');

const createReview = async(req,res)=>{
  try {

    const {userId,productId,comment,rating}=req.body
    //verificamos que los id sean de tipo uuid
    if(typeof userId !== 'string' || typeof productId !== 'string'){
      res.status(400).send('Los id deben ser de tipo uuid y no numericos')
    };
    //verificamos que los datos sean correctos 
    if(!userId||!productId||!comment||!rating){
      res.status(400).send('Datos incorrectos')
    };

    //Si los datos son correctos creamos la review
    const review = await Review.create({
      userUserId:userId,
      productProductId:productId,
      comment:comment,
      rating:rating
    })

    res.status(200).json({message:"Review, fue creada con exito",review:review})

  } catch (error) {
    res.status(500).send(error)
  }

}

module.exports = createReview;