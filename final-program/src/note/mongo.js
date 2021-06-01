//Unexcepted identifier 
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
require('dotenv-defaults').config();
function connectMongo() {
  mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
//Unexpected token
//export default mongo;
