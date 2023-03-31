export default class productsForIndexDTO {
    constructor(product){
      this.name = product.name
      this.id = product.id
      this.price = product.price
      this.img = product.img
    }
    async product(){
      return this
    }
  }