import MongoClass from "../../contenedores/MongoClass.js";
import { carritosSchema } from "../../models/CarritosSchema.js";

export class MongoDBCarritos extends MongoClass {
    constructor() {
        super("carritos", carritosSchema);
    }

    async addProductos(carrito, productos) {
        productos.forEach(producto => {
            // chequear si el producto ya esta en el carrito
           const productoEnCarrito = carrito.productos.find(p => p._id == producto._id);
              if (productoEnCarrito) {
                    productoEnCarrito.cantidad ++;
            }else { 
              carrito.productos.push(producto);
            }
        });
        const carritoUpdated = await this.collection.findByIdAndUpdate(carrito._id, {productos: carrito.productos});
        return carritoUpdated;
    }

    async deleteProducto(carrito, productoId) {
        const productoEnCarrito = carrito.productos.find(p => p._id == productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad > 1? productoEnCarrito.cantidad --: carrito.productos = carrito.productos.filter(p => p._id != productoId);
        }else{
            throw new Error("El producto no esta en el carrito");
        }
        const carritoUpdated = await this.collection.findByIdAndUpdate(carrito._id, {productos: carrito.productos});
        return carritoUpdated;
    }
}