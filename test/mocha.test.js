import supertest from 'supertest';
import chai from 'chai';
const request = supertest('http://localhost:8080/products');
const expect = chai.expect;

describe('test api productos', () => {
  describe('listar products', () => {
    it('Debería retornar un status 200', async () => {
      const response = await request.get('/list');
      expect(response.status).to.eql(200);
    });
    it('Debería retornar un objeto como data', async () => {
      const response = await request.get('/listar');
      expect(response.body).to.be.an('object');
    });
  });

  describe('crear producto', async () => {
    it('Debería retornar un status 201 y crear un producto', async () => {
      const response = await request.post('/create').send({
        name: 'Creado con supertest',
        description: 'sss',
        code: 'asd',
        img: 'asd',
        price: 123333333,
        stock: 5,
      });
      expect(response.status).to.eql(201);
      // console.log(response.body)
      expect(response.body.product).include.keys( 'name', 'description', 'code', 'img', 'price', 'stock', '_id');
      expect(response.body.product.name).to.eql('Creado con supertest');
      expect(response.body.product.description).to.eql('sss');
      expect(response.body.product.code).to.eql('asd');
      expect(response.body.product.img).to.eql('asd');
      expect(response.body.product.price).to.eql(123333333);
      expect(response.body.product.stock).to.eql(5);
    });
  });


  describe('actualizar producto', async () => {
    it('Debería retornar un status 201 y modificar un producto', async () => {
      let response = await request.post('/create').send({
        name: 'Creado con supertest',
        description: 'sss',
        code: 'asd',
        img: 'asd',
        price: 123333333,
        stock: 5,
      });
      const productId = response.body.product._id;
      response = await request.put(`/update/${productId}`).send({
        name: 'Modificado con supertest',
        description: 'sss',
        code: 'asd',
        img: 'asd',
        price: 123333333,
        stock: 5,
      });
      expect(response.status).to.eql(201);
      expect(response.body.product).include.keys( 'name', 'description', 'code', 'img', 'price', 'stock', '_id');
      expect(response.body.product.name).to.eql('Modificado con supertest');
      expect(response.body.product.description).to.eql('sss');
      expect(response.body.product.code).to.eql('asd');
      expect(response.body.product.img).to.eql('asd');
      expect(response.body.product.price).to.eql(123333333);
      expect(response.body.product.stock).to.eql(5);
    });
  });

  describe('borrar producto', async () => {
    it('Debería retornar un status 200 y borrar un producto', async () => {
      let response = await request.post('/create').send({
        name: 'Creado con supertest para ser borrado',
        description: 'sss',
        code: 'asd',
        img: 'asd',
        price: 123333333,
        stock: 5,
      });
      const productId = response.body.product._id;
      response = await request.delete(`/delete/${productId}`);
      expect(response.status).to.eql(200);
      expect(response.body.product).include.keys( 'name', 'description', 'code', 'img', 'price', 'stock', '_id');
      expect(response.body.product.name).to.eql('Creado con supertest para ser borrado');
      expect(response.body.product.description).to.eql('sss');
      expect(response.body.product.code).to.eql('asd');
      expect(response.body.product.img).to.eql('asd');
      expect(response.body.product.price).to.eql(123333333);
      expect(response.body.product.stock).to.eql(5);
      expect(response.body.product._id).to.eql(productId);

    });
  });
});