const {
    getAllProducts,
    getProductById
} = require('../../models/products.model');

const {
    getPagination
} = require('../../services/query')
// Function to get all products
async function httpgetAllProducts(req, res) {
    try {
      console.log('Fetching all products...');
      const {skip, limit} = getPagination(req.query)
      const products = await getAllProducts(skip, limit);
      console.log('Product data loaded successfully.');
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

async function httpgetProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await getProductById(productId);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            })
        }
        return res.json(product)
    } catch (error) {
        console.error('Error fetching product:', error)
        res.status(500).json({
            error: 'Failed to fetch product'
        })
    }
}  

module.exports = {
    httpgetAllProducts,
    httpgetProductById
};
