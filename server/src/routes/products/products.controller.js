const {
    getAllProducts
} = require('../../models/products.model')
// Function to get all products
async function httpgetAllProducts(req, res) {
    try {
      console.log('Fetching all products...');
      const products = await getAllProducts();
      console.log('Product data loaded successfully.');
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

module.exports = {
    httpgetAllProducts,
};
