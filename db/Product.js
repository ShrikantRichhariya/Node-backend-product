const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productname:String,
  price:Number,
  vendor:String,
  quantity:Number,
  warranty:Number

});

module.exports = mongoose.model('products',productSchema );