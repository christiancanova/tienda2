import logger from '../../utils/winston.js';
import ProductsRepo from './repository.js';

export async function getProducts(req, res) {
  try {
    const products = await ProductsRepo.getAll();
    res.json({ products });
  } catch (error) {
    logger.error(`Error al listar productos. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await ProductsRepo.get(id);

    if (!product)
      return res
        .status(400)
        .json({ error_description: 'Producto no encontrado.' });

    res.cookie('id', product._id);
    res.render('product', { product });
  } catch (error) {
    logger.error(`Error al obtener producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function createProduct(req, res) {
  try {
    const product = req.body;
    const newProduct = await ProductsRepo.create(product);

    return res.status(201).json({ product: newProduct });
  } catch (error) {
    logger.error(`Error al crear producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = req.body;
    const id = req.params.id;
    if (await ProductsRepo.update(id, updatedProduct)) {
      const product = {
        _id: id,
        ...updatedProduct,
      };
      return res.status(201).json({ product });
    }
    return res
      .status(400)
      .json({ error_description: 'Producto no encontrado.' });
  } catch (error) {
    logger.error(`Error al actualizar producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await ProductsRepo.delete(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ error_description: 'Producto no encontrado.' });
    }
    res.status(200).json({ product });
  } catch (error) {
    logger.error(`Error al borrar producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function addProductToCart(req, res) {
  try {
    const productId = req.cookies.id;
    const { quantity } = req.body;
    const user = req.user;
    ProductsRepo.addProductToCart(productId, quantity, user);
    res.redirect('/');
  } catch (error) {
    logger.error(`Error al agregar producto carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}