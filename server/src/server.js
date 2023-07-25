const http = require('http');
require('dotenv').config();


const app = require('./app');



const { mongoConnect } = require('./services/mongo');
const {loadProducts} = require('./models/products.model')

app.listen();

const PORT = process.env.PORT || 8000;



const server = http.createServer(app);



async function startServer() {
    await mongoConnect();
    // Check if MongoDB is already populated, if not, fetch data from Azure Blob Storage and populate it
    const productsCount = await loadProducts();
    if (productsCount === 0) {
      console.log('No products found in MongoDB, fetching data...');
      await loadProducts();
      console.log('Product data loaded and inserted into MongoDB');
    } else {
      console.log('Product data already exists in MongoDB');
    }
    server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    });
  }

startServer();
