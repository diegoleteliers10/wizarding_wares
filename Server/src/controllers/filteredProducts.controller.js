const Product = require('../models/Product.model')
const Category =  require('../models/Category.model')
const { Op } = require('sequelize');

const filteredProduct = async (req, res) =>{
  const {category,stock, minPrice, maxPrice} = req.query
  try {

    //si solo hay categorias
    if(category && !stock && !minPrice && !maxPrice){
      const response = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: category,
          },
        },
      });

      const products = response.map(product => ({
        productId: product.productId,
        name:product.name,
        description:product.description,
        image: product.image,
        price:product.price,
        stock:product.stock,
        isActive: product.isActive,
        category: product.category.name,
      }));

      res.status(200).json(products)
    };

    //si solo hay stock
    if(stock && !category && !minPrice && !maxPrice){
      let response;
      if(stock === 'yes'){
        response = await Product.findAll({
              where: {
                stock: {
                  [Op.gt]: 0
                }
              },
              include: {
              model: Category,
              }
        });
      } else if (stock === 'no'){
        response = await Product.findAll({
          where: {
            stock: 0
          },
          include: {
          model: Category,
          }
        });
      }

      const products = response.map(product => ({
        productId: product.productId,
        name:product.name,
        description:product.description,
        image: product.image,
        price:product.price,
        stock:product.stock,
        isActive: product.isActive,
        category: product.category.name,
      }));

      res.status(200).json(products)
    };

    //si solo hay rango de precio
    if(minPrice && maxPrice && !category && !stock){
    const response = await Product.findAll({
          where: {
            price: {
              [Op.between]: [minPrice, maxPrice]
            }
          },
          include: {
          model: Category,
          }
    });

      const products = response.map(product => ({
        productId: product.productId,
        name:product.name,
        description:product.description,
        image: product.image,
        price:product.price,
        stock:product.stock,
        isActive: product.isActive,
        category: product.category.name,
      }));

      res.status(200).json(products)
    };

    //Si hay categorias y stock
    if(category && stock && !minPrice && !maxPrice){
      let response;
      if(stock === 'yes'){
        response = await Product.findAll({
          include: {
            model: Category,
            where: {
              name: category
            }
          },
          where: {
            stock: {
              [Op.gt]: 0
            }
          }
        });
      } else if (stock === 'no'){
        response = await Product.findAll({
          include: {
            model: Category,
            where: {
              name: category
            }
          },
          where: {
            stock: 0
          }
        });
      }
      

      const products = response.map(product => ({
        productId: product.productId,
        name:product.name,
        description:product.description,
        image: product.image,
        price:product.price,
        stock:product.stock,
        isActive: product.isActive,
        category: product.category.name,
      }));

      res.status(200).json(products)
    };

    if(category && minPrice && maxPrice && !stock){
      const response = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: category
          }
        },
        where: {
          price: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        }
      });

      const products = response.map(product => ({
        productId: product.productId,
        name:product.name,
        description:product.description,
        image: product.image,
        price:product.price,
        stock:product.stock,
        isActive: product.isActive,
        category: product.category.name,
      }));

      res.status(200).json(products)
    };

    //con stock y rango de precio 
    if(stock && minPrice && maxPrice && !category){
      const response = await Product.findAll({
        where: {
          stock: {
            [Op.gt]: 0
          },
          price: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        },
        include:{
          model: Category,
        }
      });

      const products = response.map(product => ({
        productId: product.productId,
        name:product.name,
        description:product.description,
        image: product.image,
        price:product.price,
        stock:product.stock,
        isActive: product.isActive,
        category: product.category.name,
      }));

      res.status(200).json(products)
    }


  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = filteredProduct;