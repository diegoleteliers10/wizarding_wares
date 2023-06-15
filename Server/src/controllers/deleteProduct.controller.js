const { Product } = require('../models/relationship/relationship');

const deleteProduct = async (req, res) => {
    const { id } = req.params;

        try {
            const product = await Product.findByPk(id);
        
            if (!product) {
            return res.status(404).json({ message: 'Product not found' });
            }
        
            await Product.update(
                { isActive: !product.isActive }, // Cambiar el valor de "isActive" al opuesto
                { where: { productId: id } }
            );
            return res.status(200).send('Successful remove');
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting product' });
        };
};

module.exports = deleteProduct;
