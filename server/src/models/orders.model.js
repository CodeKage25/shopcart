const orderDatabase = require('./orders.mongo')


// function to create a new order
async function createOrder(orderData) {
    try {
        const order = new orderDatabase(orderData)
        await order.save();
        return order;
    } catch (error) {
        console.error('Error creating order:', error)
        throw error;
    }
}


// Function to get all orders
async function getAllOrders() {
    try {
        const orders = await orderDatabase.find().populate('products', '-__v -createdAt -updatedAt');
        return orders
    } catch (error) {
        console.error('Error creating order:', error)
        throw error;
    }
}

// Function to get a specific order by ID
async function getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId).populate('products', '-__v -createdAt -updatedAt');
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
  };