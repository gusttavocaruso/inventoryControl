const mdl = require('../models/ingredientsModel');
const vldt = require('../../utils/validtFuncs');

const registerIngredient = async (ingredientData) => {
  vldt.ingredientsEntriesValidation(ingredientData);

  const ingredientId = await mdl.postIngredient(ingredientData);
  return ingredientId;
};

const searchIngredients = async () => {
  const ingredients = await mdl.getIngredients();
  return ingredients;
};

module.exports = {
  registerIngredient,
  searchIngredients,
};
