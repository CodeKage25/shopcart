const express = require('express');
const {
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    googleCallback,
} = require('./userAuth.controller');

const authRouter = express.Router();

authRouter.post('/', registerUser);
authRouter.post('/', loginUser);
authRouter.post('/', logoutUser);
authRouter.post('/', googleLogin);
authRouter.get('/', googleCallback);

module.exports = authRouter
