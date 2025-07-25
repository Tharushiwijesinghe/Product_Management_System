import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true
});

const Product = mongoose.model('product', productSchema);


export default Product;
