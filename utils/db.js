const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const connection = {};

async function connect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    console.log("disconnected!");
  }
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  var mongoConnect = await mongoose.connect(process.env.MONGODB_URI, opts);
  console.log('new connection');
  
  connection.isConnected = mongoConnect.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    console.log("disconnected!");
  }
}

const createCollection = mongoose.connection; 
const db = { connect, disconnect, createCollection };

module.exports = {db};
