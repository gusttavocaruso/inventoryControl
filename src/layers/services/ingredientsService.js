const mdl = require('../models/ingredientsModel');

const registerIngredient = async (ingredientData) => {
  const ingredientId = await mdl.postIngredient(ingredientData);
  return ingredientId;
};

module.exports = {
  registerIngredient,
};
