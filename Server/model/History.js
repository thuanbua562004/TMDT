const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
  name: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },  
  userId: { type: String, required: true }, 
  products: [productSchema],  
  totalAmount: { type: Number, required: true },  
  orderDate: { type: String, default: Date.now },
  phone: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
