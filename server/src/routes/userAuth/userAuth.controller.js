require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/userAuth.mongo');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
    const payload = { userId: user._id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

  const registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      const token = generateToken(newUser);
      return res.status(201).json({ token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        return res.status(200).json({ token });
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email } = response.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, create a new user
      const password = `${email}${process.env.GOOGLE_SECRET}`;
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
    }

    // Generate JWT token
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in with Google:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const googleCallback = async (req, res) => {
    try {
      const { email } = req.user;
  
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        // If user does not exist, create a new user
        const password = `${email}${process.env.GOOGLE_SECRET}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });
        await user.save();
      }
  
      // Generate JWT token
      const token = generateToken(user);
      // Redirect the user to your frontend URL with the token as a query parameter
      res.redirect(`http://localhost:3000/?token=${token}`);
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
  

const logoutUser = async (req, res) => {
    try {
      res.clearCookie('jwtToken');
      return res.redirect('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
      req.user = user;
      next();
    });
  };

  module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    authenticateToken,
    logoutUser,
    googleCallback,
  };