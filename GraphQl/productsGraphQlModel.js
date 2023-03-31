import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: { type: String, require: true, max: 100 },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true, max: 300 },
});

export default mongoose.model('productsGraphQl',schema);