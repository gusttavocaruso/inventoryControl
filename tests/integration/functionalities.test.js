const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../../src/server');

const mongodb = require('mongodb').MongoClient;
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);
const { expect } = chai;


let connectionMock;
before(async () => {
  connectionMock = await getConnection();
  sinon.stub(mongodb, 'connect').resolves(connectionMock);
});
after(() => { mongodb.connect.restore() });


describe('Cadastro de novos ingredientes no estoque', () => {
  let response;

  describe('Testa quando são informadas entradas válidas para cadastro de um novo ingrediente', () => {

    before(async () => {
      response = await chai.request(server)
        .post('/ingredient/new')
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
      response = await chai.request(server)
        .post('/ingredient/new')
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
      response = await chai.request(server)
        .post('/product/new')
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
      response = await chai.request(server)
        .post('/product/new')
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
