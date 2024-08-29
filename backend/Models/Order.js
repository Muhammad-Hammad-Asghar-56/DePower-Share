const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: Number,
    required: true
  },
  _consumer: {
    type: String,
    required: true
  },
  _producer: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  numOfUnits: {
    type: Number,
    required: true
  },
  adId: {
    type: Number,
    required: true
  }
});

// Create the model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
