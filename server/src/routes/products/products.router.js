const express = require('express');
const {
    httpgetAllProducts,
    httpgetProductById
} = require('./products.controller')

const productsRouter = express.Router();

productsRouter.get('/', httpgetAllProducts);
productsRouter.get('/:id', httpgetProductById);

module.exports = productsRouter;