const vldt = require('../../utils/validtFuncs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { API_SECRET } = process.env;
const JWT_CONFIG = { expiresIn: '1d', algorithm: 'HS256' };

const tokenGenerate = (payload) => jwt.sign({ payload }, API_SECRET, JWT_CONFIG);

const tokenVerify = (token) => {
  try {
    const { payload } = jwt.verify(token, API_SECRET);
    return payload;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const signInService = ({ username, password }) => {
  vldt.loginEntriesValidation(username, password);

  const token = tokenGenerate(username);
  return token;
};

module.exports = {
  signInService,
  tokenVerify,
};
