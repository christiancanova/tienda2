import logger from "../../services/winston.js";
import Products from '../products/productModel.js'

export async function getCartProducts(req, res) {
    try {
      const user = req.user;
      const userCart = await user.cart;
      const cartArr = await Promise.all(
        userCart.map(async (element) => {
          return {
            product: await Products.findById(element.product),
            quantity: element.quantity,
            id: element._id,
          };
        })
      );
      res.render('cart', { cartArr });
    } catch (error) {
      logger.error(`Error al obtener carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }
  
  export async function deleteProduct(req, res) {
    const user = req.user;
    const itemInCart = req.params.id;
    try {
      const userCart = await user.cart;
  
      for (let index = 0; index < userCart.length; index++) {
        let id = userCart[index]._id;
        id = JSON.stringify(id);
        id = id.slice(1);
        id = id.slice(0, id.length - 1);
        if (id === itemInCart) {
          userCart.splice(index, 1);
        }
      }
      await user.save();
      res.redirect('/cart');
    } catch (error) {
      logger.error(`Error al borrar producto del carrito. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
  }