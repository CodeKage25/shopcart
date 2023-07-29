const express = require('express')
const productsRouter = require('./products/products.router');
const ordersRouter = require('./orders/orders.router');
const authRouter = require('./userAuth/userAuth.router');
const { authenticateToken } = require('./userAuth/userAuth.controller');



const api = express.Router();

api.use('/products', productsRouter);
api.use('/orders', ordersRouter);

api.use('/protected-route-1', authenticateToken, (req, res) => {
    res.json({ message: 'Protected Route 1' });
  });
  
  api.use('/protected-route-2', authenticateToken, (req, res) => {
    res.json({ message: 'Protected Route 2' });
  });


api.use('/register', authRouter)
api.use('/login', authRouter)
api.use('/google-login', authRouter)
api.use('/auth/google/callback', authRouter)

module.exports = api;