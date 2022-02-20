const vldt = require('../../utils/validtFuncs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { API_SECRET } = process.env;
const JWT_CONFIG = { expiresIn: '1d', algorithm: 'HS256' };

const tokenGenerate = (payload) => jwt.sign({ payload }, API_SECRET, JWT_CONFIG);

const signInService = ({ username, password }) => {
  vldt.loginEntriesValidation(username, password);

  const token = tokenGenerate(username);
  return token;
};

module.exports = {
  signInService,
};
