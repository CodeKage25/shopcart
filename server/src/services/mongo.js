const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true, //determines how mongoose parses the connection string copied into the mongo_url
        useUnifiedTopology: true, // with this, mongoose will use the updated way talking to cluster of mongo db
    })
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}


module.exports = {
    mongoConnect,
    mongoDisconnect
}