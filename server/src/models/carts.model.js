const cartDatabase = require('./carts.mongo');
const productsDatabase  = require('./products.mongo');

async function getCartById(cartId) {
  try {
    const cart = await cartDatabase.findById(cartId).populate('products.product', '-_id name currentPrice');
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

async function createOrUpdateCart(cartData) {
  try {
    const productIds = cartData.products.map((product) => product.product);

    // Find the products from the database based on the extracted IDs
    const products = await productsDatabase.find({ _id: { $in: productIds } });

    let totalItems = 0;
    let totalPrice = 0;

    // Calculate total items and total price for the cart
    for (const product of products) {
      const cartProduct = cartData.products.find((item) => item.product.equals(product._id));
      totalItems += cartProduct.quantity;
      totalPrice += product.currentPrice * cartProduct.quantity;
    }

    const cart = await cartDatabase.findOneAndUpdate(
      { _id: cartData.cartId }, // Use cartId to check if the cart exists
      {
        products: cartData.products,
        totalItems,
        totalPrice,
      },
      {
        new: true,
        upsert: true, // Create a new cart if it doesn't exist
      }
    );

    return cart;
  } catch (error) {
    console.error('Error creating/updating cart:', error);
    throw error;
  }
}

module.exports = {
    getCartById,
    createOrUpdateCart
};
