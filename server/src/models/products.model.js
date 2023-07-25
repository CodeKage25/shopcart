require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");

require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = connectionString;
const containerName = "shopcart";
const blobName = "productData.json";

// Fetch JSON Data from Azure Blob Storage using Azure Storage SDK
async function fetchJsonData() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const response = await blockBlobClient.download(0); // Start reading from the beginning
  const jsonData = await response.read();
  return JSON.parse(jsonData.toString());
}

module.exports = {
  fetchJsonData
};

