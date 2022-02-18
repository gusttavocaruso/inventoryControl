const mdl = require('../models/ingredientsModel');
const vldt = require('../../utils/validtFuncs');

const registerIngredient = async (ingredientData) => {
  vldt.ingredientsEntriesValidation(ingredientData);

  const ingredientId = await mdl.postIngredient(ingredientData);
  return ingredientId;
};

module.exports = {
  registerIngredient,
};
