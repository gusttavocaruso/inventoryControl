const srvc = require('../services/ingredientsService');

const ingredientRegister = async (req, res, next) => {
  try {
    const ingredientData = req.body;
    const id = await srvc.registerIngredient(ingredientData);

    return res.status(201).json({ id, ...ingredientData });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ingredientsSearch = async (_req, res, next) => {
  try {
    const ingredients = await srvc.searchIngredients();

    return res.status(200).json(ingredients);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  ingredientRegister,
  ingredientsSearch,
};
