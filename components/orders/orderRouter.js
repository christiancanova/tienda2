import { Router } from "express";
import { checkOut, getUserOrder,getOrders} from './orderController.js'

const orderRouter = new Router();

orderRouter.post('/order', checkOut)

orderRouter.get('/order/:id', getUserOrder)

orderRouter.get('/order/list', getOrders)

orderRouter.get('/orderSuccess', (req, res)=>{
  res.render('orderSuccess')
})

export default orderRouter