import Joi from 'joi';
import mongoose from 'mongoose';

const name = Joi.string().min(3).required();
const description = Joi.string().min(4).required();
const code = Joi.number().required();
const img = Joi.string().min(4).required();
const price = Joi.string().min(4).required();
const stock = Joi.string().min(4).required();
const timestamp = Joi.string().min(4).required();

export default mongoose.model('products', {
  name,
  description,
  code,
  img,
  price,
  stock,
  timestamp,
});