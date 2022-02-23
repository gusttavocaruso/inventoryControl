const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { resolve } = require('path');

const mongodb = require('mongodb').MongoClient;
const { getConnection } = require('./connectionMock');
const { send } = require('process');

chai.use(chaiHttp);
const { expect } = chai;


let connectionMock;
before(async () => {
  connectionMock = await getConnection();
  sinon.stub(mongodb, 'connect').resolves(connectionMock);
});
after(() => { mongodb.connect.restore() });


describe('Logando no sistema', () => {
  let response;

  describe('Testa quando são informadas entradas válidas para realizar login no sistema', () => {

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          username: 'owner',
          password: 'admin123',
        });
    });

    it('A requisição deve retornar o status 202', () => {
      expect(response).to.have.status(202);
    })

    it('A requisição deve retornar um objeto com um token', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('token');
    })

    it('a propriedade "token" deve conter um JWT com o username usado no login', () => {
      const { token } = response.body;
      const { payload } = jwt.decode(token);

      expect(payload).to.be.equals('owner');
    });

  });

  describe('Testa quando não são informadas entradas válidas para realizar login no sistema', () => {

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          username: 'own',
          password: 'admin',
        });
    });

    it('A requisição deve retornar o status 401', () => {
      expect(response).to.have.status(401);
    })

    it('A requisição deve retornar a mensagem: Username or password is wrong', () => {
      expect(response.body.message).to.be.equals('Username or password is wrong');
    })

  });

});

describe('Cadastro de novos ingredientes no estoque', () => {
  let response;

  describe('Testa quando são informadas entradas válidas para cadastro de um novo ingrediente', () => {

    before(async () => {
      const mockLogin = await chai.request(server)
        .post('/login')
        .send({
          username: 'owner',
          password: 'admin123',
        });
      const token = await mockLogin.body.token;

      response = await chai.request(server)
      .post('/ingredient/new')
      .set('authorization', token)
      .send({
        name: 'ovo',
        unitValue: 0.75,
        unitMeasur: 'unity',
        stockQnty: 30
      });
    });

    it('A requisição deve retornar o status 201', () => {
      expect(response).to.have.status(201);
    })

    it('A requisição deve retornar um objeto com um id', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('id');
    })

  });

  describe('Testa quando não é informado um nome ao tentar registrar um novo ingrediente', () => {

    before(async () => {
      const mockLogin = await chai.request(server)
        .post('/login')
        .send({
          username: 'owner',
          password: 'admin123',
        });
      const token = await mockLogin.body.token;

      response = await chai.request(server)
        .post('/ingredient/new')
        .set('authorization', token)
        .send({
          unitValue: 0.75,
          unitMeasur: 'unity',
          stockQnty: 30
        });
    });

    it('A requisição deve retornar o status 400', () => {
      expect(response).to.have.status(400);
    })

    it('A requisição deve retornar a mensagem: "name" is required', () => {
      expect(response.body.message).to.be.equals('"name" is required');
    })

  });

});

describe('Cadastro de novos produtos', () => {
  let response;

  describe('Testa quando são informadas entradas válidas para cadastro de um novo produto', () => {

    before(async () => {
      const mockLogin = await chai.request(server)
        .post('/login')
        .send({
          username: 'owner',
          password: 'admin123',
        });
      const token = await mockLogin.body.token;

      response = await chai.request(server)
        .post('/product/new')
        .set('authorization', token)
        .send({
          name: 'Pipoca média',
          salePrice: 10,
          ingredients: { milho: 0.5, manteiga: 0.05 },
        });
    });

    it('A requisição deve retornar o status 201', () => {
      expect(response).to.have.status(201);
    })

    it('A requisição deve retornar um objeto com um id', () => {
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('id');
    })

  });

  describe('Testa quando não é informado um preço de venda ao tentar registrar de um novo produto', () => {

    before(async () => {
      const mockLogin = await chai.request(server)
        .post('/login')
        .send({
          username: 'owner',
          password: 'admin123',
        });
      const token = await mockLogin.body.token;

      response = await chai.request(server)
        .post('/product/new')
        .set('authorization', token)
        .send({
          name: 'Pipoca grande',
          ingredients: { milho: 0.85, manteiga: 0.075 },
        });
    });

    it('A requisição deve retornar o status 400', () => {
      expect(response).to.have.status(400);
    })

    it('A requisição deve retornar a mensagem: "salePrice" is required', () => {
      expect(response.body.message).to.be.equals('"salePrice" is required');
    })

  });

});

describe('Cadastro de imagem no produto', () => {
  let response;

  describe('Testa quando é adicionado uma imagem à um produto com sucesso', () => {

    before(async () => {
      // const folderPath = resolve(__dirname, '../../uploads');
      const mockLogin = await chai.request(server)
        .post('/login')
        .send({
          username: 'owner',
          password: 'admin123',
        });
      const token = await mockLogin.body.token;

      const mockProduct = await chai.request(server)
        .post('/product/new')
        .set('authorization', token)
        .send({
          name: 'Copão',
          salePrice: 10,
          ingredients: { gelo: 0.05, wisky: 0.5 },
        });

      response = await chai.request(server)
        .put(`/products/${mockProduct.body.id}/image`)
        .set('authorization', token)
        // .set('content-type', 'multipart/form-data')
        .send({ image: `${mockProduct.body.id}.jpeg` })
        // .attach('image', fs.readFileSync(`${folderPath}/${mockProduct.body.id}.jpeg`))
        // console.log(`${folderPath}/${body.id}.jpeg`)
    });

    it('A requisição deve retornar o status 200', () => {
      expect(response).to.have.status(200);
    })

    it('A requisição deve retornar um objeto com uma mensagem: image already add', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equals('image already add');
    })

  });

});