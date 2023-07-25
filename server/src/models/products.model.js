require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");

const productsDatabase = require('./products.mongo');

const connectionString = process.env.CONNECTIONSTRING;
const containerName = "shopcart";
const blobName = "productData.json";

// Fetch JSON Data from Azure Blob Storage using Azure Storage SDK
async function fetchJsonData() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const response = await blockBlobClient.download(0); // Start reading from the beginning
  console.log(response)
  if (response.status !== 200) {
    console.log('Problem downloading data');
    throw new Error('product Data failed');
  }

  const jsonData = await response.read();
    console.log(jsonData);
  return JSON.parse(jsonData.toString());
}

async function populateProduct() {
  try {
    console.log('Downloading product data...');
    const jsonData = await fetchJsonData();
    console.log('Product data downloaded successfully.');

    const products = jsonData.map((item) => {
      return {
        category: item.category,
        subCategory: item.subcategory,
        name: item.name,
        currentPrice: item.current_price,
        currency: item.currency,
        imgUrl: item.img_url,
        model: item.model,
        productID: item.id
      };
    });

    console.log('Inserting product data into MongoDB...');
    await productsDatabase.insertMany(products);
    console.log('Product data inserted into MongoDB successfully.');
  } catch (error) {
    console.error('Error populating product data:', error);
  }
}

async function loadProducts() {
    try {
      console.log('Loading product data from MongoDB...');
      const products = await productsDatabase.find();
      console.log('Product data loaded successfully.');
  
      return products;
    } catch (error) {
      console.error('Error loading product data:', error);
      throw error;
    }
}

async function getAllProducts() {
    try {
      console.log('Loading all products...');
      const products = await productsDatabase.find();
      console.log('Products loaded successfully.');
      return products;
    } catch (error) {
      console.error('Error loading products:', error);
      throw error;
    }
  }
  
  

module.exports = {
  fetchJsonData,
  populateProduct,
  loadProducts,
  getAllProducts
};
