# ShopCart - Your One-Stop Shop for All Kinds of Products

ShopCart is an e-commerce platform that provides a wide range of products for shopping enthusiasts. Whether you're looking for electronics, fashion items, home decor, or anything else, ShopCart has got you covered. You can easily browse, select, and check out your favorite items with a seamless shopping experience.

![ShopCart Screenshot](/path/to/screenshot.png)

## Getting Started

To get started with ShopCart, make sure you have [Node.js](https://nodejs.org/) installed on your system. Additionally, you'll need to set up a MongoDB database to store product information. You can either create a free MongoDB Atlas database online or start a local MongoDB database.

Once you have Node.js and MongoDB set up, follow these steps:

1. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.

2. In the terminal, navigate to the project root folder and run:

   ```bash
   npm install

# Running the Project

3. To run the ShopCart project, use the following command:

   ```bash
   npm run deploy


This will start both the server and the frontend application. You can then access the ShopCart platform by browsing to `localhost:8000`.
Docker

If you prefer running the project using Docker, follow these steps:

Ensure you have the latest version of Docker installed on your system.

Build the Docker image:

    ```bash
    docker build -t shopcart

Run the Docker container:

    ```bash
    docker run -it -p 8000:8000 shopcart

## Running the Tests

To run automated tests for the ShopCart project, use the following command:
  
    ```bash
    npm test

This will run both client-side and server-side tests.

To run client-side tests only, use:

    npm test --prefix client


To run server-side tests only, use:


    npm test --prefix server


## Note

Please ensure you have Node.js installed and a MongoDB database set up before running the project. For more details, refer to the "Getting Started" section above.
Happy Shopping!

Enjoy using ShopCart and discovering a wide range of products. If you encounter any issues or have suggestions for improvements, we'd love to hear from you!
