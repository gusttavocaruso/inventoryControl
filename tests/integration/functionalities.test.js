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

