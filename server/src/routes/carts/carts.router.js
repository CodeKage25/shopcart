const express = require('express');
const {
    getCart, 
    updateCart
} = require('./carts.controller');

const cartsRouter = express.Router();

cartsRouter.get('/:cartId', getCart);
cartsRouter.post('/:cartId', updateCart);

module.exports = cartsRouter;