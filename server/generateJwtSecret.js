const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generate a random 32-byte buffer
const randomBuffer = crypto.randomBytes(32);

// Convert the buffer to a hex string
const jwtSecret = randomBuffer.toString('hex');

// Create a .env file if it doesn't exist
const envFilePath = path.join(__dirname, '.env');
if (!fs.existsSync(envFilePath)) {
  fs.writeFileSync(envFilePath, '', 'utf8');
}

// Append the JWT_SECRET to the .env file
fs.appendFileSync('.env', `JWT_SECRET=${jwtSecret}\n`, 'utf8');

console.log('JWT Secret generated and saved to .env file.');
