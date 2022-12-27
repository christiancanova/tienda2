import { Router } from 'express';
import { carritosDao as api } from '../daos/index.js';
const carritosRouter = Router();

carritosRouter.get('/', async (req, res) => {
    try {
        const carritos = await api.getAll();
        carritos? res.status(200).json(carritos) : res.status(404).json({message: 'No hay carritos disponibles'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

carritosRouter.get('/:id', async (req, res) => {
    try {
        const carrito = await api.getOne(req.params.id);
        carrito? res.status(200).json(carrito) : res.status(404).json({message: 'Carrito no encontrado. id: ' + req.params.id});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

carritosRouter.post('/', async (req, res) => {
    try {
        const nuevoCarrito = await api.create(req.body);
        res.status(201).json({
            message: 'Carrito creado con éxito',
            carrito: nuevoCarrito});
        }catch (err) {
        res.status(500).json({message: err.message});
    }
});

// listas productos de un carrito
carritosRouter.get('/:id/productos', async (req, res) => {
    try {
        const carrito = await api.getOne(req.params.id);
        carrito? res.status(200).json(carrito.productos) : res.status(404).json({message: 'Carrito no encontrado. id: ' + req.params.id});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//agregar productos a un carrito
carritosRouter.post('/:id/productos', async (req, res) => {
    try {
        const carrito = await api.getOne(req.params.id);
        const productos = req.body; // array de objetos 
        if (carrito && productos) {
            const carritoUpdated = await api.addProductos(carrito, productos);
            const newCarrito = await api.getOne(carritoUpdated._id);
            res.status(201).json({
                message: 'Productos agregados con éxito',
                carrito: newCarrito});
        }
        if(!carrito) {
            res.status(404).json({message: 'Carrito no encontrado. id: ' + req.params.id});
        }
        if(!productos) {
            res.status(404).json({message: 'La lista de productos está vacía'});
        }
    } catch (err) {
        res.status(500).json({message: err.message, line: err.line});
    }
});
      
// borrar un producto de un carrito
carritosRouter.delete('/:id/productos/:productoId', async (req, res) => {
    try {
        const carrito = await api.getOne(req.params.id);
        const productoId = req.params.productoId;
        if (carrito && productoId) {
            const carritoUpdated = await api.deleteProducto(carrito, productoId);
            const newCarrito = await api.getOne(carritoUpdated._id);
            res.status(200).json({
                message: 'Producto eliminado con éxito',
                carrito: newCarrito});
        }
        if(!carrito) {
            res.status(404).json({message: 'Carrito no encontrado. id: ' + req.params.id});
        }
        if(!productoId) {
            res.status(404).json({message: 'El producto no existe'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});






export default carritosRouter;