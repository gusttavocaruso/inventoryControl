const joi = require('@hapi/joi');
const errHandle = require('./errHandle');

const ingredientsEntriesValidation = ({ name, unitValue, unitMeasur, stockQnty }) => {
  const ingredientSchema = joi.object({
    name: joi.string().min(3).required(),
    unitValue: joi.number().min(0).required(),
    unitMeasur: joi.string().required(),
    stockQnty: joi.number().min(0).required(),
  });
  const { error } = ingredientSchema
    .validate({ name, unitValue, unitMeasur, stockQnty });
  if (error) throw errHandle(400, error.message);
};

const productEntriesValidation = ({ name, salePrice, ingredients }) => {
  const productSchema = joi.object({
    name: joi.string().min(3).required(),
    salePrice: joi.number().min(0).required(),
    ingredients: joi.object().required(),
  });
  const { error } = productSchema
    .validate({ name, salePrice, ingredients });
  if (error) throw errHandle(400, error.message);
};

const loginEntriesValidation = (uss, pss) => {
  if (uss !== 'owner' || pss !== 'admin123') {
    throw errHandle(401, 'Username or password is wrong')
  }
};

const tokenValidation = (token) => {
  if (token !== 'owner') throw errHandle(401, 'unauthorized');
};

const stockAvailableValidation = () => {

};

module.exports = {
  ingredientsEntriesValidation,
  productEntriesValidation,
  loginEntriesValidation,
  tokenValidation,
  stockAvailableValidation,
};
