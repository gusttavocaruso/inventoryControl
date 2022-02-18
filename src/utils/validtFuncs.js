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

module.exports = {
  ingredientsEntriesValidation,
};
