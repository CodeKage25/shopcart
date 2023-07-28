require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const axios = require('axios');


const productsDatabase = require('./products.mongo');

// Fetch JSON Data from Azure Blob Storage
async function fetchJsonData() {
    try {
        const url = process.env.URL;
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from Azure Blob Storage:', error);
        throw error;
      }
  }  

// async function fetchCsvData() {
//   return new Promise((resolve, reject) => {
//     const csvData = [];
//     fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'productData.csv'))
//       .pipe(parse({ columns: true }))
//       .on('data', (data) => {
//         csvData.push(data); // Push each parsed row to the csvData array
//       })
//       .on('error', (err) => {
//         console.error('Error parsing CSV:', err);
//         reject(err);
//       })
//       .on('end', () => {
//         resolve(csvData); // Resolve with the array of parsed data
//       });
//   });
// }

  
  

async function populateProduct() {
  try {
    console.log('Fetching product data...');
    const jsonData = await fetchJsonData();
      console.log('Product data fetched successfully.');
      console.log(jsonData);

    const products = jsonData.map((item) => {
      return {
        category: item.category,
        subCategory: item.subcategory,
        name: item.name,
        currentPrice: item.current_price,
        currency: item.currency,
        imgUrl: item.image_url,
        productID: item.id,
        model: item.model,
      };
    });

    console.log('Inserting product data into MongoDB...');
    await productsDatabase.insertMany(products);
    console.log('Product data inserted into MongoDB successfully.');
  } catch (error) {
    console.error('Error populating product data:', error);
  }
}

// async function populateProduct() {
//     try {
//       console.log('Fetching CSV data...');
//       const csvData = await fetchCsvData();
//       console.log('CSV data fetched successfully.');
  
//       const products = csvData.map((item) => {
//         return {
//           category: item.category,
//           subCategory: item.subcategory,
//           name: item.name,
//           currentPrice: Number(item.current_price),
//           currency: item.currency,
//           Brand: item.brand,
//           imgUrl: item.image_url,
//           productID: item.id,
//           model: item.model,
//         };
//       });
  
//       console.log('Inserting product data into MongoDB...');
//       await productsDatabase.insertMany(products);
//       console.log('Product data inserted into MongoDB successfully.');
//     } catch (error) {
//       console.error('Error populating product data:', error);
//     }
//   }
  

async function loadProducts() {
    try {
      console.log('Loading product data from MongoDB...');
      const products = await productsDatabase.find({}, {
        '_id': 0, '__v': 0,
    });
      console.log('Product data loaded successfully.');
  
      return products;
    } catch (error) {
      console.error('Error loading product data:', error);
      throw error;
    }
}

async function getAllProducts(skip, limit, sortBy) {
    try {
        console.log('Loading all products...');
        let query = productsDatabase.find({}, { '_id': 0, '__v': 0 });

        // If sortBy parameter is provided, apply sorting
        if (sortBy) {
            query = query.sort({ [sortBy]: 1 }); // 1 for ascending order, -1 for descending
        }

        const products = await query.skip(skip).limit(limit);
        console.log('Products loaded successfully.');
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
}
  
  

module.exports = {
  populateProduct,
  loadProducts,
  getAllProducts
};
