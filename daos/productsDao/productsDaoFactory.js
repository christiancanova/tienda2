import yargObj from "../../utils/yargs.js"
import productsDaoMongo from './productsDaoMongo.js';
import logger from "../../utils/winston.js";
const type = yargObj.persistence.toUpperCase()



class ProductDAOFactory{
  getDao(){
    if (type === 'MONGO'){
      return new productsDaoMongo()
    } else{
      logger.log('info', 'por ahora solo hay dao para Mongo')
      return new productsDaoMongo()
    }
  }
}

export default new ProductDAOFactory