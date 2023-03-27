import Products from '../../components/products/productModel.js';
import logger from '../../utils/winston.js';

class productsDaoMongo {
  constructor() {
    if (productsDaoMongo.instance == null) {
      productsDaoMongo.instance = this;
    }
    return productsDaoMongo.instance;
  }
  async get(id) {
    try {
      return await Products.findById(id);
    } catch (error) {
      logger.error(`error al buscar producto en la db . ${error}`)
    }
  }

  async getAll(query = {}) {
    try {
      return await Products.find(query);
    } catch (error) {
      logger.error(`error al buscar los productos en la db . ${error}`)
    }
  }

  async create(product) {
    try {
      return await Products.create(product);
    } catch (error) {
      logger.error(`error al crear producto en la db. ${error}`)
    }
  }

  async update(id, updatedProduct) {
    try {
      return await Products.findByIdAndUpdate(id, updatedProduct);
    } catch (error) {
      logger.error(`error al actualizar producto en la db. ${error}`)
    }
  }

  async delete(id) {
    try {
      return await Products.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`error al borrar producto en la db . ${error}`)
    }
  }
}

export default productsDaoMongo;