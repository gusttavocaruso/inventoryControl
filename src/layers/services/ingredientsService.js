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

const searchIngredientById = async (id) => {
  const ingredient = await mdl.getIngredientById(id);
  return ingredient;
};

module.exports = {
  registerIngredient,
  searchIngredients,
  searchIngredientById,
};
