const mdl = require('../models/ingredientsModel');

const ingredientRegister = async (ingredientData) => {
  const ingredientId = await mdl.postIngredient(ingredientData);
  return ingredientId;
};

module.exports = {
  ingredientRegister,
};
