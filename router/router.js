import users from '../components/users/userRouter.js'
import carts from '../components/carts/cartRouter.js'
import orders from '../components/orders/orderRouter.js'
import products from '../components/products/productRouter.js'
import { isAuth } from '../utils/Auth.js'
import Products from '../components/products/productModel.js'
import productsForIndexDTO from '../components/products/DOTs/productsForIndexDTO .js'
import logger from '../utils/winston.js'
import indexRoutes from "../router/indexRoutes.js";

export default (app) =>{
    
    products(app)
    carts(app)
    app.use(users)
    app.use(orders)
    
    app.get('/', isAuth, async(req, res) => {
        const user = req.user
        try {
          const products = await Products.find({});
          const productsDTO = products.map(product => new productsForIndexDTO(product))
          res.render('index', { user, productsDTO })
        } catch (error) {
          logger.error(`Error al listar productos. ${error}`);
        }
    
    
      });
      app.use(indexRoutes);
      app.get('*', (req, res) =>
        res.status(404).json({
          error: -2,
          description: `ruta ${req.originalUrl} método get no implementado`,
        })
      );
    };
 