const {
    createOrder,
    getAllOrders,
    getOrderById,
} = require('../../models/orders.model');


async function httpCreateOrder(req, res) {
    try {
        const { products, totalPrice, customerName, customerEmail } = req.body;
        const orderData = {
            products,
            totalPrice,
            customerName,
            customerEmail,
          };
        const order = await createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
    }
}

async function httpgetAllOrders(req, res) {
    try {
        console.log('Fetching all orders...');
        const orders = await getAllOrders();
        console.log('Orders loaded successfully.');
        res.status(200).json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
      }
}

async function httpgetOrderById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }


module.exports = {
    httpCreateOrder,
    httpgetAllOrders,
    httpgetOrderById
};  