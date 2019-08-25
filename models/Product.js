const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  productDesc: {
    type: String
  },
  productType: {
    type: String
  },
  productPrice: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
