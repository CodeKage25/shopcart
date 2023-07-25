const express = require('express');
const {
    httpgetAllProducts
} = require('./products.controller')

const productsRouter = express.Router();

productsRouter.get('/', httpgetAllProducts);

module.exports = productsRouter;