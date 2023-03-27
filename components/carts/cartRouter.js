import { Router } from "express";
import { isAuth } from "../../utils/Auth.js";
import {getCartProducts, deleteProduct} from './cartController.js'

const cartRouter = new Router();

export default (app)  =>{
    app.use('/cart', cartRouter)

    cartRouter.get('/', isAuth, getCartProducts);

    cartRouter.delete('/:id', isAuth, deleteProduct)
}