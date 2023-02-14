import { Router } from 'express';
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductToCart
} from './productController.js';

const productsRouter = new Router();

export default (app) => {
  app.use('/products', productsRouter);

  productsRouter.get('/list', getProducts);

  productsRouter.get('/list/:id', getProduct);

  productsRouter.post('/list/:id', addProductToCart)

  productsRouter.post('/create', createProduct);

  productsRouter.put('/update/:id',updateProduct );

  productsRouter.delete('/delete/:id', deleteProduct);
};