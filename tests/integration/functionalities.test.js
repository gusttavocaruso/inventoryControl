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

});