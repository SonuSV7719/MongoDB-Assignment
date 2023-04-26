var mongoose = require("mongoose");
// var db = require('../utils/db');

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String},
    last_name: { type: String},
    email: { type: String},
    gender: { type: String},
    income: { type: String},
    city: { type: String},
    car: { type: String},
    quote: { type: String},
    phone_price: { type: String}
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = { User };