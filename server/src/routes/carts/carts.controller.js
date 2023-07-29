const {
    getCartById,
    createOrUpdateCart
} = require('../../models/carts.model');

async function getCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await getCartById(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
}
  
async function updateCart(req, res) {
    try {
      const { cartId } = req.params;
      const cartData = req.body;
      cartData.cartId = cartId;
      const cart = await createOrUpdateCart(cartData);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error creating/updating cart:', error);
      res.status(500).json({ error: 'Failed to create/update cart' });
    }
  }
  
module.exports = {
    getCart,
    updateCart };