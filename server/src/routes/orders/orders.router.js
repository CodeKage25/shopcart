const express = require('express');
const {
    httpCreateOrder,
    httpgetAllOrders,
    httpgetOrderById
} = require('./orders.controller');

const ordersRouter = express.Router();

ordersRouter.post('/', httpCreateOrder); // Route to create a new order
ordersRouter.get('/', httpgetAllOrders); // Route to get all orders
ordersRouter.get('/:id', httpgetOrderById); // Route to get a specific order by ID

module.exports = ordersRouter;